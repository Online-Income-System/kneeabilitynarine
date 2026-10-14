import React, { useState } from "react";

/* "Join my newsletter" box, shown above the footer on every page except the
   standalone /course sales page (so it also sits at the end of every blog
   post). Posts to the Netlify function netlify/functions/newsletter-signup.mts,
   which adds the person to GHL with the tags narine-list + newsletter-signup. */

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // hidden spam trap
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/.netlify/functions/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, company }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "flex-1 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-green-brand";

  return (
    <section className="bg-green-brand-50 border-t border-green-brand/15">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <p className="text-green-brand-dark text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          The Knee Ability Newsletter
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-navy-brand mb-4">
          Join my newsletter
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Real client stories and simple tips for a stronger body.
        </p>

        {status === "done" ? (
          <p className="text-navy-brand text-lg font-semibold" role="status">
            Thank you, {firstName.trim()}! You're on the list.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
          >
            <label className="sr-only" htmlFor="nl-first-name">First name</label>
            <input
              id="nl-first-name"
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={field}
            />
            <label className="sr-only" htmlFor="nl-email">Email</label>
            <input
              id="nl-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-green-brand hover:bg-green-brand-dark disabled:opacity-60 text-white font-semibold px-8 py-3.5 transition-colors"
            >
              {status === "sending" ? "Joining..." : "Join"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-slate-600 text-sm mt-4" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
