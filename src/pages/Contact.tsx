import React, { useState } from "react";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { CalendarCheck, Search, ClipboardList, Send, Star } from "lucide-react";
import { GOOGLE } from "../data/reviews";

/* ─────────────────────────────────────────────────────────────────────────
   CONTACT PAGE — the entry point for the free consult, sourced from the real
   flow in wiki/offers/offer-architecture.md: free consult -> body assessment
   -> personalised 1:1 plan. No prices (hers are in flux, same call made on
   Home/Services). Zero I/me/my.

   OPEN ITEM, flagged for Joshua: there is no confirmed GHL calendar/form
   embed link or Narine's real phone number yet (both tracked in
   docs/SITE-PLAN.md "Open decisions"). The form below is a real, working
   local form (validates, shows a confirmation state) but does NOT send
   anywhere yet — it needs to be wired to her GHL webhook/embed once Joshua
   has that link. Swap the onSubmit handler for the real GHL integration
   then. Structure/pattern cloned from Mason's Contact.tsx (hero + scheduler
   + "what to expect" cards), scheduler swapped for a form since there's no
   Calendly/GHL link for her yet. */

const EXPECT: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; title: string; text: string }[] = [
  {
    icon: Search,
    title: "The full picture",
    text: "Where you're at, what hurts, and what you want to be able to do again. She listens first.",
  },
  {
    icon: ClipboardList,
    title: "A real assessment",
    text: "What's actually behind the pain, not just where it shows up. That's what the plan gets built around.",
  },
  {
    icon: CalendarCheck,
    title: "A plan, not a pitch",
    text: "You leave knowing what to work on first and what training together would actually look like.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(Joshua): wire this to her real GHL form/webhook once the link exists.
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Book Your Free Consult | Knee Ability Narine</title>
        <meta
          name="description"
          content="Book a free consult with Narine: a real conversation about your pain, a body assessment, and a personalised plan to get you moving again. Burbank, CA and online."
        />
      </Head>

      {/* Hero + form */}
      <motion.section
        className="relative pt-40 pb-16 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_10%,rgba(22,160,124,0.08)_0%,transparent_100%)]" />
        <div className="max-w-3xl mx-auto text-center mb-6">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Book your free consult
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            Start with{" "}
            <span className="italic text-green-brand">a conversation.</span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto mb-4">
            One free call. What's going on, what you want back, and what the
            path there actually looks like. No pressure, no obligation.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
            <div className="flex text-star-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-star-gold" strokeWidth={0} />
              ))}
            </div>
            <span>
              {GOOGLE.rating.toFixed(1)} · {GOOGLE.count} Google reviews
            </span>
          </div>
        </div>

        <div className="max-w-xl mx-auto rounded-3xl border border-slate-100 shadow-2xl shadow-green-brand/10 bg-white p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-green-brand-50 border border-green-brand/10 flex items-center justify-center mx-auto mb-6">
                <CalendarCheck className="w-7 h-7 text-green-brand" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl font-serif text-slate-900 mb-3">
                Request sent.
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Narine's team will reach out shortly to find a time. Keep an
                eye on your inbox and phone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-shadow"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-shadow"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  What's going on?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-shadow resize-none"
                  placeholder="Tell her a little about the pain or injury, and what you're hoping to get back to."
                />
              </div>
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-green-brand text-white text-base font-medium hover:bg-green-brand-dark transition-all hover:scale-[1.02] shadow-lg shadow-green-brand/25"
              >
                Book Your Free Consult
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {/* What to expect */}
      <section className="bg-slate-50 border-t border-slate-100 py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              What to expect
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900">
              No pressure. Just a real conversation.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {EXPECT.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-green-brand-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-green-brand" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-serif text-slate-900 mb-3">
                  {title}
                </h3>
                <p className="text-slate-700 font-normal leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
