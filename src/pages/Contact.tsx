import React, { useState } from "react";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { CalendarCheck, Search, ClipboardList, Send, Star } from "lucide-react";
import { GOOGLE } from "../data/reviews";

/* ─────────────────────────────────────────────────────────────────────────
   CONTACT PAGE — the entry point for the free call, sourced from the real
   flow in wiki/offers/offer-architecture.md: free call -> body assessment
   -> personalised 1:1 plan. No prices (hers are in flux, same call made on
   Home/Services). Zero I/me/my.

   Form -> email: wired to Netlify Forms (native to the hosting stack, no
   GHL/CRM needed) per Narine's request to just get an email whenever
   someone submits. The <form> below carries data-netlify="true" plus a
   matching hidden form-name input and honeypot field, and the built HTML
   is prerendered (vite-react-ssg), so Netlify's build-time form scanner can
   detect it. Submission itself is done via fetch() to "/" since this is a
   client-rendered React form, not a native HTML POST.
   OPEN ITEM for Joshua: turn on the email notification in the Netlify
   dashboard (Site settings -> Forms -> Form notifications -> Email
   notification) pointed at Narine's inbox — that last step is account
   config, not code, and can't be done from here.
   Calendly link/embed still pending from Narine (see docs/SITE-PLAN.md).

   Photo gallery below: her explicit request was a fun collage/montage on
   this page "so it's not empty," ideally group/teaching shots with other
   people in frame. Only one of the six available photos (narine-contact-1,
   a coaching-a-client shot) actually has another person in it — the real
   group-class photos in her Drive are all 10-21MB, over the same 10MB
   download cap that blocked the testimonial videos. These six are all
   that could be pulled for now; flagged to Joshua as a v2 upgrade if she
   can get smaller/compressed group photos over. */
const GALLERY_PHOTOS: string[] = [
  "/narine-contact-1.jpg",
  "/narine-contact-2.jpg",
  "/narine-contact-3.jpg",
  "/narine-contact-4.jpg",
  "/narine-contact-5.jpg",
  "/narine-contact-6.jpg",
];

const EXPECT: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; title: string; text: string }[] = [
  {
    icon: Search,
    title: "The full picture",
    text: "Where you're at, what hurts, and what you want to be able to do again. She listens first.",
  },
  {
    icon: ClipboardList,
    title: "A real assessment",
    text: "What's actually behind the pain, beyond where it shows up. That's what the plan gets built around.",
  },
  {
    icon: CalendarCheck,
    title: "A custom plan",
    text: "You follow a plan built specifically for you and your injuries, with a roadmap to actually get out of pain.",
  },
];

function encodeFormData(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({ "form-name": "contact", ...form }),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Book Your Free Call | Knee Ability Narine</title>
        <meta
          name="description"
          content="Book a free call with Narine: a real conversation about your pain, a body assessment, and a personalised plan to get you moving again. Burbank, CA and online."
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
            Book your free call
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            Start with{" "}
            <span className="italic text-green-brand">a conversation.</span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto mb-4">
            One free call. What you're feeling, what you want to be able to
            do, and what the path there actually looks like. No pressure, no
            obligation.
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
            <form
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
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
              {error && (
                <p className="text-sm text-red-600">
                  Something went wrong sending that. Please try again, or text
                  or email Narine directly in the meantime.
                </p>
              )}
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-green-brand text-white text-base font-medium hover:bg-green-brand-dark transition-all hover:scale-[1.02] shadow-lg shadow-green-brand/25"
              >
                Book Your Free Call
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
              No pressure. A real conversation.
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

      {/* Photo gallery — a peek inside the gym, keeps this page from feeling empty */}
      <section className="py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14 text-center mx-auto">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              In the gym
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900">
              A peek at what training with her looks like.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {GALLERY_PHOTOS.map((src, i) => (
              <motion.div
                key={src}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              >
                <img
                  src={src}
                  alt="Narine training a client at her gym in Burbank, CA"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget.closest("div") as HTMLElement).style.display = "none";
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
