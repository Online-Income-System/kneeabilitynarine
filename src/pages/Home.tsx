import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Reviews from "../components/Reviews";
import { SMS_LINK } from "../components/Navbar";

/* ─────────────────────────────────────────────────────────────────────────
   HERO COPY — her VSL promise, verbatim. Variants live in the build notes.
   ───────────────────────────────────────────────────────────────────────── */
const HERO_KICKER = "1:1 Rehab Training · Burbank, CA & Online";
const HERO_HEADLINE = "Get out of knee and back pain.";
const HERO_HEADLINE_ACCENT = "Without surgery, shots, or steroids."; // italic green
const HERO_SUBHEADLINE =
  "You've tried rest, PT, maybe even the surgery, and the pain keeps coming back. I rebuild your body from the ground up until you're stronger, more mobile, and pain free. That's my guarantee.";
const HERO_CTA_LABEL = "Text me to start";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — white background, centered serif headline, green italic accent */}
      <motion.section
        className="relative pt-40 pb-28 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hero background layers */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_50%_8%,rgba(14,147,132,0.10)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-70 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(14,147,132,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(60% 55% at 50% 28%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(60% 55% at 50% 28%, black 0%, transparent 78%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -z-10 top-24 -left-12 w-72 h-72 rounded-full bg-green-brand/10 blur-3xl pointer-events-none"
          animate={{ x: [0, 22, 0], y: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -z-10 top-8 -right-10 w-80 h-80 rounded-full bg-green-brand-50 blur-3xl pointer-events-none"
          animate={{ x: [0, -26, 0], y: [0, 20, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-8">
            {HERO_KICKER}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] text-slate-900 mb-8">
            {HERO_HEADLINE}{" "}
            <motion.span
              className="italic text-green-brand inline-block"
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.65 }}
            >
              {HERO_HEADLINE_ACCENT}
            </motion.span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 font-normal leading-relaxed mb-12 max-w-2xl mx-auto">
            {HERO_SUBHEADLINE}
          </p>
          <div className="flex flex-col items-center gap-6">
            <a
              href={SMS_LINK}
              className="group px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-[#0e9384]/25 flex items-center gap-2"
            >
              {HERO_CTA_LABEL}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Credibility strip — auto-scrolling Google + Yelp review banner */}
      <Reviews />

      {/* HOMEPAGE = 12-STEP SALES LETTER (Joshua's template, 2026-07-23).
          Built section by section with Josh:
           1. Get attention        → Hero above (headline + subhead)
           2. Identify the problem → problem-agitate: body-scanning before bed,
              the injury loop, "temporary pain relief trials"
           3. Provide the solution → the Ground-Up Method (belief → rebuild → capacity)
           4. Credentials          → Meet Narine: her own rebuild story, ATG cert,
              55+ out of pain, 5.0 on Google
           5. Show the benefits    → life back: hike, dance, sleep, no Advil,
              play with your kids without scanning your body first
           6. Social proof         → review wall + video testimonials (carousel
              above doubles as the early trust strip)
           7. Make the offer       → free consult (sometimes complimentary first
              session with felt relief — Isabella's review)
           8. Inject scarcity      → REAL capacity: ~2-3 in-person spots,
              online capped; prices rise at capacity
           9. Guarantee            → her verbatim: "if you follow my program, you
              will become stronger, more mobile and pain free"
          10. Call to action       → text me / book the free consult
          11. Warning              → cost of waiting: "What if this is just my
              life now?"
          12. Close with reminder  → P.S. block restating offer + capacity */}
    </div>
  );
}
