/* ─────────────────────────────────────────────────────────────────────────
   SITEMAP GENERATOR — runs after `vite-react-ssg build`, writes dist/sitemap.xml

   Why it walks `dist` rather than importing the route table: the built
   output is the only thing that knows for certain which pages actually
   exist. If a route fails to pre-render, or a blog slug changes, or someone
   adds a page and forgets to update a list somewhere, walking dist stays
   correct and a hand-maintained list quietly goes stale. Every directory in
   dist containing an index.html is a real, live, indexable URL.

   `lastmod` comes from the blog data where the URL is a post (parsed out of
   src/data/blog.ts with a regex rather than an import, so this stays a
   plain .mjs script with no TypeScript build step). Pages that are not
   posts get no lastmod at all, which is correct: a fabricated lastmod of
   "today" on every page every deploy trains crawlers to ignore the field.

   Wire-up lives in package.json: "build": "vite-react-ssg build && node scripts/generate-sitemap.mjs" */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

/* Read SITE_URL out of src/lib/site.ts so there is one source of truth. */
async function readSiteUrl() {
  const src = await readFile(path.join(ROOT, "src/lib/site.ts"), "utf8");
  const m = src.match(/export const SITE_URL\s*=\s*["'`]([^"'`]+)["'`]/);
  if (!m) throw new Error("Could not find SITE_URL in src/lib/site.ts");
  return m[1].replace(/\/+$/, "");
}

/* Pull { slug -> date } out of the blog data file. */
async function readPostDates() {
  const src = await readFile(path.join(ROOT, "src/data/blog.ts"), "utf8");
  const dates = new Map();

  /* Locate every `slug: "..."` and treat the text from there to the next
     one as that post's block. Slicing between slugs is what keeps this
     honest: a lazy `[\s\S]*?` across the whole file will happily pair one
     post's slug with a later post's date and look like it worked. */
  const slugRe = /slug:\s*"([^"]+)"/g;
  const marks = [];
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    marks.push({ slug: m[1], start: m.index });
  }

  for (let i = 0; i < marks.length; i++) {
    const block = src.slice(
      marks[i].start,
      i + 1 < marks.length ? marks[i + 1].start : src.length,
    );
    const published = block.match(/\bdate:\s*"(\d{4}-\d{2}-\d{2})"/);
    const updated = block.match(/\bupdated:\s*"(\d{4}-\d{2}-\d{2})"/);
    const value = updated?.[1] ?? published?.[1];
    if (value) dates.set(marks[i].slug, value);
  }
  return dates;
}

/* vite-react-ssg emits flat .html files, not directories of index.html:
   dist/index.html, dist/services.html, dist/blog.html, dist/blog/<slug>.html.
   So every .html file under dist (outside assets/) is one routable URL, with
   index.html mapping to "/".

   Pages that must never be indexed go in EXCLUDE. 404.html is here because a
   soft-404 in a sitemap is a real ranking problem, not a cosmetic one. */
const EXCLUDE = new Set(["/404", "/200"]);

async function collectRoutes(dir, base = "") {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      /* Vite's hashed asset folder holds no pages. */
      if (entry.name === "assets") continue;
      out.push(
        ...(await collectRoutes(
          path.join(dir, entry.name),
          base ? `${base}/${entry.name}` : entry.name,
        )),
      );
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const name = entry.name.replace(/\.html$/, "");
    const route =
      name === "index"
        ? base
          ? `/${base}`
          : "/"
        : `/${base ? `${base}/` : ""}${name}`;

    if (EXCLUDE.has(route)) continue;
    out.push(route);
  }
  return out;
}

/* Homepage first, then the money pages, then blog, then posts. Priority is
   a weak signal at best, but the ordering also makes the file readable by a
   human, which matters more when something looks wrong. */
function priorityFor(route) {
  if (route === "/") return "1.0";
  if (["/services", "/contact"].includes(route)) return "0.9";
  if (route === "/about" || route === "/blog") return "0.8";
  if (route.startsWith("/blog/")) return "0.7";
  return "0.5";
}

function changefreqFor(route) {
  if (route === "/" || route === "/blog") return "weekly";
  if (route.startsWith("/blog/")) return "yearly";
  return "monthly";
}

function rank(route) {
  const order = ["/", "/services", "/about", "/contact", "/blog"];
  const i = order.indexOf(route);
  return i === -1 ? order.length + (route.startsWith("/blog/") ? 1 : 2) : i;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error("[sitemap] dist/ not found — run the build first.");
    process.exit(1);
  }
  await stat(DIST);

  const siteUrl = await readSiteUrl();
  const postDates = await readPostDates();
  const routes = (await collectRoutes(DIST)).sort(
    (a, b) => rank(a) - rank(b) || a.localeCompare(b),
  );

  const urls = routes
    .map((route) => {
      const slug = route.startsWith("/blog/") ? route.slice("/blog/".length) : null;
      const lastmod = slug ? postDates.get(slug) : null;
      return [
        "  <url>",
        `    <loc>${siteUrl}${route === "/" ? "/" : route}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <changefreq>${changefreqFor(route)}</changefreq>`,
        `    <priority>${priorityFor(route)}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs at build time. Do not edit by
     hand: it is rewritten on every build from what actually rendered. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");

  const missingDates = routes.filter(
    (r) => r.startsWith("/blog/") && !postDates.get(r.slice("/blog/".length)),
  );
  console.log(`[sitemap] wrote dist/sitemap.xml — ${routes.length} URLs`);
  if (missingDates.length) {
    console.warn(
      `[sitemap] no lastmod found for: ${missingDates.join(", ")} — check the slug/date parse in readPostDates()`,
    );
  }
}

main().catch((err) => {
  console.error("[sitemap] failed:", err);
  process.exit(1);
});
