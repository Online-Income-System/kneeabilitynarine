/* ─────────────────────────────────────────────────────────────────────────
   STRUCTURED DATA BUILDERS (JSON-LD)

   Two audiences, one output:

   1. SEO — Google uses this for rich results (review stars, FAQ accordions,
      article cards, the local knowledge panel).
   2. GEO — ChatGPT, Claude, Perplexity, Gemini and Google's AI Overviews
      lift answers out of pages. Explicit question/answer pairs and explicit
      entity relationships are far easier for them to quote correctly than
      the same facts buried in prose. Everything below exists to make the
      page's claims machine-readable rather than merely readable.

   Kept as plain builder functions returning plain objects so they can be
   unit-checked and JSON.stringify'd straight into a <script> tag. */

import { SITE_URL, BUSINESS, PROFILES, absoluteUrl } from "./site";
import { GOOGLE } from "../data/reviews";
import { BLOG_POSTS, type BlogPost } from "../data/blog";

/* Stable @id values. Using fragment identifiers on the canonical origin
   means every schema block on every page refers to the SAME business and
   the SAME person node rather than declaring a new one each time, which is
   what lets a crawler merge them into a single entity. */
export const ORG_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#narine`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: BUSINESS.legalPerson,
    jobTitle: "Rehab and Strength Coach",
    description:
      "Narine Ashnalikyan is an ATG-certified rehab and strength coach in Burbank, California who works with people in persistent knee, back, hip, groin, ankle and shoulder pain, in person and online.",
    knowsLanguage: ["en", "hy"],
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/about`,
    image: absoluteUrl("/narine-about-photo.jpg"),
    sameAs: PROFILES,
  };
}

export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: BUSINESS.name,
    description:
      "1:1 rehab and strength training for people in persistent pain, in Burbank, California and online. Knee, back, hip, groin, ankle, shin splint and shoulder rehabilitation without surgery, shots or steroids.",
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    image: absoluteUrl("/narine-about-photo.jpg"),
    logo: absoluteUrl("/knee-ability-logo-green.png"),
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
    /* Only ever emitted because the same reviews are visibly rendered on the
       homepage carousel. Google requires the rating to be present on the page
       it is claimed on; do not move this to a page that shows no reviews. */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE.rating,
      reviewCount: GOOGLE.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: BUSINESS.bookingUrl,
        inLanguage: "en-US",
      },
      name: "Book a free call",
    },
    sameAs: PROFILES,
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export type FaqPair = { q: string; a: string };

/* ─── FAQ EXTRACTION ───────────────────────────────────────────────────────
   Every migrated post already ends with a "### Frequently Asked Questions"
   section written as:

       ### Frequently Asked Questions

       **Some question?** The answer, in one paragraph.

       **Another question?** Another answer.

   Rather than hand-copying those into a separate data structure (which then
   drifts out of sync with the body the moment anyone edits it), parse them
   out of the markdown at render time. One source of truth: the article.

   Returns [] when a post has no FAQ section, which is the correct behaviour
   for a post that genuinely has none — an empty FAQPage block is an error. */
export function extractFaqs(markdown: string): FaqPair[] {
  /* The heading is not identical across the migrated posts: most say
     "Frequently Asked Questions", the patellar tendonitis post says
     "Frequently Asked Questions About Patellar Tendonitis". Allow a trailing
     qualifier rather than normalising nine published articles to suit a
     regex — and rather than silently dropping the FAQ schema on the one
     post that words it differently, which is what a stricter pattern did. */
  const heading = /^###\s+(?:Frequently Asked Questions|FAQs?)\b.*$/im;
  const start = markdown.search(heading);
  if (start === -1) return [];

  const afterHeading = markdown.slice(start).replace(heading, "");
  /* Stop at the next h3, which is where the FAQ section ends. */
  const nextHeading = afterHeading.search(/^###\s+/m);
  const block = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);

  const pairs: FaqPair[] = [];
  for (const para of block.split(/\n{2,}/)) {
    const line = para.trim();
    if (!line.startsWith("**")) continue;
    const m = line.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
    if (!m) continue;
    const q = m[1].trim();
    const a = m[2].trim().replace(/\s+/g, " ");
    if (q && a) pairs.push({ q, a });
  }
  return pairs;
}

export function faqPageSchema(faqs: FaqPair[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Strip markdown to plain text, for `articleBody` and word counts. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function blogPostingSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const plain = toPlainText(post.body);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: absoluteUrl(post.image),
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    wordCount: plain.split(" ").length,
    /* `about` names the medical/anatomical subject explicitly. This is the
       single most useful field for GEO: it tells an assistant what the page
       is about without making it infer the topic from the prose. Omitted
       entirely when a post has no topics — an empty array is not a neutral
       statement, it is an explicit claim that the page is about nothing. */
    ...(post.topics?.length
      ? { about: post.topics.map((name) => ({ "@type": "Thing", name })) }
      : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function videoObjectSchema(
  video: NonNullable<BlogPost["video"]>,
  post: BlogPost,
) {
  return {
    "@type": "VideoObject",
    name: video.title,
    description: video.description ?? post.excerpt,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    uploadDate: video.uploadDate ?? post.date,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    ...(video.durationIso ? { duration: video.durationIso } : {}),
    publisher: { "@id": ORG_ID },
  };
}

/** The /blog listing page: a Blog node with every post as an ItemList, so a
 *  crawler can see the whole archive from one page rather than having to
 *  discover each post by following links. */
export function blogListingSchema() {
  return {
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Knee Ability Narine Blog",
    description:
      "Research-backed guidance on knee, back and joint pain, injury recovery and training smarter, from Narine Ashnalikyan.",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": ORG_ID },
    author: { "@id": PERSON_ID },
    inLanguage: "en-US",
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}#article`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      image: absoluteUrl(p.image),
    })),
  };
}

/** Wrap one or more schema nodes into a single @graph document. One script
 *  tag per page, not five: crawlers resolve the @id cross-references inside
 *  a graph, and it keeps the built HTML readable.
 *
 *  Nested "@context" keys are stripped. A node is allowed to carry its own
 *  @context when it stands alone (the Services FAQ_SCHEMA does, because it
 *  predates this file), but repeating it inside a graph is at best noise
 *  and at worst a parse error in stricter validators. */
export function graph(...nodes: object[]) {
  const clean = nodes.map((node) => {
    const { "@context": _ignored, ...rest } = node as Record<string, unknown>;
    return rest;
  });
  return {
    "@context": "https://schema.org",
    "@graph": clean,
  };
}
