// Newsletter sign-up: the "Join my newsletter" box on every page posts here.
// Sends the person to Narine's Kit form "Website sign-up" (form 10160399),
// the same way a Kit-hosted form would. No API key or Netlify settings needed.
//
// To change which Kit form people join, change KIT_FORM_ID below.
// Whether people must confirm by email (double opt-in) is set in Kit:
// the form's Settings > Incentive > "Send incentive email".
//
// Switched from GHL to Kit on 8 Nov 2026.

const KIT_FORM_ID = "10160399";
const KIT_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;
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

  const form = new URLSearchParams();
  form.set("email_address", email);
  form.set("fields[first_name]", firstName);

  try {
    const res = await fetch(KIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Origin: "https://kneeabilitynarine.com",
        Referer: "https://kneeabilitynarine.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
      },
      body: form.toString(),
      redirect: "manual",
    });
    const text = await res.text().catch(() => "");
    // Always log what Kit said, so a failed sign-up can be traced in
    // Netlify's function logs.
    console.log(
      "newsletter-signup: Kit replied",
      res.status,
      res.headers.get("location") ?? "",
      text.slice(0, 400).replace(/\s+/g, " "),
    );
    // Only count it as a sign-up when Kit says so in its JSON reply.
    if (res.status === 200 && /"status"\s*:\s*"success"/.test(text)) {
      return json({ ok: true });
    }
    return json({ ok: false, error: "crm" }, 502);
  } catch (err) {
    console.error("newsletter-signup: request error", err);
    return json({ ok: false, error: "crm" }, 502);
  }
};
