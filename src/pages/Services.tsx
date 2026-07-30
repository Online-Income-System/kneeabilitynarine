import React from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { Check, ArrowRight, MapPin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   SERVICES PAGE — her three real offers from wiki/offers/offer-architecture.md:
   1:1 online (includes meal planning, the growth/scale product), 1:1
   in-person (Burbank, CA, limited by real capacity), and hybrid. No prices —
   her packages are still in flux, same call made on the homepage's offer
   section. Structure cloned from Mason's Services.tsx (same stack, same
   hero-card + premium-grid pattern), recolored to her green/navy palette
   and rewritten in her own voice from the voice guide. Zero I/me/my. */

const ONLINE_FEATURES = [
  "A 1:1 program built around your exact injury, not a template",
  "A weekly support call to check in and adjust the plan",
  "24/7 text access to Narine between sessions",
  "Done-for-you grocery lists and macro tracking, so you still eat what you love",
];

const PREMIUM = [
  {
    name: "In-Person",
    tag: "Limited",
    tagline: "One-on-one, in her Burbank, CA gym.",
    desc: "Hands-on coaching every session, adjusted in real time. The most direct access to Narine, and the most limited by design.",
    features: [
      "Sessions in her Burbank, CA gym, built around your schedule",
      "Real-time form correction, hands-on",
      "Only a couple of new spots open at a time",
    ],
  },
  {
    name: "Hybrid",
    tag: "Combined",
    tagline: "In-person sessions, plus online support between visits.",
    desc: "For people who want hands-on coaching in the room and a plan that keeps working on the days you're not there.",
    features: [
      "Regular in-person sessions in Burbank, CA",
      "The full online programming and support between visits",
      "One plan that follows you between the gym and home",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Services | Knee Ability Narine</title>
        <meta
          name="description"
          content="Ways to train with Narine: 1:1 online coaching with weekly support and done-for-you nutrition, plus in-person and hybrid options in Burbank, CA. Every plan starts with a free call."
        />
      </Head>

      {/* Hero */}
      <motion.section
        className="relative pt-40 pb-16 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_10%,rgba(22,160,124,0.08)_0%,transparent_100%)]" />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Ways to train
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            The same method,{" "}
            <span className="italic text-green-brand">wherever you train.</span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
            Every plan starts with a free call and the same rule: you never
            push through pain.
          </p>
        </div>
      </motion.section>

      {/* Online — the hero offer */}
      <section className="px-6 md:px-12 pb-8">
        <motion.div
          className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-green-brand/20 bg-green-brand"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block rounded-full bg-white text-green-brand-dark text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1 mb-5">
                Most flexible
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Online Coaching
              </h2>
              <p className="text-white/85 font-normal leading-relaxed mb-8 max-w-md">
                The same 1:1 coaching, from wherever you are. Built for people
                who can't get to Burbank, CA but still want a real program, not a
                PDF you open once and forget.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-green-brand-dark text-base font-medium hover:bg-green-brand-50 transition-all hover:scale-105"
              >
                Book Your Free Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <ul className="space-y-4">
              {ONLINE_FEATURES.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check
                    className="w-5 h-5 text-white shrink-0 mt-1"
                    strokeWidth={2.5}
                  />
                  <span className="text-white/90 font-normal leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Premium options */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {PREMIUM.map((offer, i) => (
              <motion.div
                key={offer.name}
                className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-serif text-slate-900">
                    {offer.name}
                  </h2>
                  <span className="rounded-full border border-green-brand/30 text-green-brand text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-0.5">
                    {offer.tag}
                  </span>
                </div>
                <p className="text-green-brand font-medium mb-3">
                  {offer.tagline}
                </p>
                <p className="text-slate-700 font-normal leading-relaxed mb-6">
                  {offer.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {offer.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check
                        className="w-5 h-5 text-green-brand shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-slate-700 font-normal leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-green-brand font-medium hover:text-green-brand-dark transition-colors"
                >
                  Book Your Free Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pricing + location note */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 text-center text-slate-500">
            <p>
              Pricing depends on your program and how much support you need.
              <br />
              That's covered on the free call.
            </p>
            <span className="hidden sm:inline text-slate-300">·</span>
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-brand" />
              In-person in Burbank, CA. Online anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
