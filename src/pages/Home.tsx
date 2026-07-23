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
  "I'm Narine. I've helped 55+ people get out of pain by rebuilding them from the ground up. My one rule: we never push through pain.";
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
          className="absolute -z-10 top-8 -right-10 w-80 h-80 rounded-full bg-gold-brand/15 blur-3xl pointer-events-none"
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
              <ArrowRight className="w-5 h-5 text-gold-brand group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Credibility strip — auto-scrolling Google + Yelp review banner */}
      <Reviews />

      {/* NEXT SECTIONS (built step-by-step with Josh):
          - The real problem (pain-point section)
          - How it works (her ground-up method)
          - Video testimonials (John, Ruzanna, Mary, …)
          - Meet Narine (origin story + photo)
          - Offers (1:1 in-person / online)
          - Final CTA (text + free consult) */}
    </div>
  );
}
