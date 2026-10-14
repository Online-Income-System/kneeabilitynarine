// Newsletter sign-up: the "Join my newsletter" box on every page posts here.
// Adds (or updates) the contact in GHL and tags them, so they get the newsletter.
//
// Needs two environment variables in Netlify (Site configuration > Environment variables):
//   GHL_TOKEN        Private Integration token from GHL (scopes: contacts.write, contacts.readonly)
//   GHL_LOCATION_ID  Narine's GHL sub-account ID (1PIEiMCAtHWOd1szdHWF)
//
// Tags added: narine-list (the newsletter list) and newsletter-signup (joined from the site).
// Tags are ADDED with a separate call so an existing contact keeps their other tags.

const GHL = "https://services.leadconnectorhq.com";
const TAGS = ["narine-list", "newsletter-signup"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request) => {
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Hidden "company" field: real people never fill it in, spam bots do.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json({ ok: true });
  }

  const firstName = String(body.firstName ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!firstName || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error("newsletter-signup: GHL_TOKEN or GHL_LOCATION_ID is not set");
    return json({ ok: false, error: "config" }, 500);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const upsert = await fetch(`${GHL}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        email,
        source: "Website newsletter sign-up",
      }),
    });
    const data = await upsert.json().catch(() => ({}));
    const contactId = (data as { contact?: { id?: string } })?.contact?.id;
    if (!upsert.ok || !contactId) {
      console.error("newsletter-signup: upsert failed", upsert.status, JSON.stringify(data));
      return json({ ok: false, error: "crm" }, 502);
    }

    const tag = await fetch(`${GHL}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: TAGS }),
    });
    if (!tag.ok) {
      console.error("newsletter-signup: tagging failed", tag.status, await tag.text());
      return json({ ok: false, error: "crm" }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("newsletter-signup: request error", err);
    return json({ ok: false, error: "crm" }, 502);
  }
};
