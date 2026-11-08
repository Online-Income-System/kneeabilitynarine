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
      },
      body: form.toString(),
      redirect: "manual",
    });
    // Kit answers with JSON ({"status":"success",...}) or a redirect to its
    // thank-you page. Both mean the sign-up went through.
    if (res.status >= 200 && res.status < 400) {
      const text = await res.text().catch(() => "");
      if (text.includes('"status":"failed"')) {
        console.error("newsletter-signup: Kit refused", text.slice(0, 300));
        return json({ ok: false, error: "crm" }, 502);
      }
      return json({ ok: true });
    }
    console.error("newsletter-signup: Kit error", res.status, (await res.text()).slice(0, 300));
    return json({ ok: false, error: "crm" }, 502);
  } catch (err) {
    console.error("newsletter-signup: request error", err);
    return json({ ok: false, error: "crm" }, 502);
  }
};
