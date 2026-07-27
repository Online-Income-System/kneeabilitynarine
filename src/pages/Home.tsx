import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Brain, Crosshair, TrendingUp, Award, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";

/* ─────────────────────────────────────────────────────────────────────────
   HERO COPY — her VSL promise, verbatim. Variants live in the build notes.
   ───────────────────────────────────────────────────────────────────────── */
const HERO_KICKER = "1:1 Rehab Training · Burbank, CA & Online";
const HERO_HEADLINE = "Get out of knee and back pain.";
const HERO_HEADLINE_ACCENT = "Without surgery, shots, or steroids."; // italic green
const HERO_SUBHEADLINE =
  "Hike again. Dance again. Sleep through the night again. No matter how long you've been in pain or how much you've already tried.";
const HERO_CTA_LABEL = "Contact";

/* ─── STEP 2 · IDENTIFY THE PROBLEM (problem-agitate) ────────────────────
   Sources: clients' verbatim pain language + her origin story mirrors.
   Zero I/me/my. Sets up the mechanism reveal in Step 3. */
const PROBLEM_KICKER = "Sound familiar?";
const PROBLEM_HEADLINE = "The pain isn't just in your knee.";
const PROBLEM_HEADLINE_ACCENT = "It's running your whole day."; // italic green
const PROBLEM_BODY: string[] = [
  "It starts before you're even out of bed. You scan your body to check what hurts today and calculate what you can get away with. Stairs get planned around. Hikes get declined. Sleep gets interrupted. Somewhere along the way, you stopped trusting your own body.",
  "So you did the responsible things. You rested it. You finished physical therapy and got handed back \u201cbasic function.\u201d You tried the creams, the cortisone, maybe even the surgery. Each one promised relief and delivered a countdown to the next flare-up. That is not healing. That is an injury loop.",
];
const PROBLEM_QUIET_QUESTION =
  "And on the bad days, the quiet question shows up: what if this is just life now?";
const PROBLEM_CLOSER =
  "It isn't. Your knee was never doomed. It was underprepared, and underprepared is fixable.";

/* ─── STEP 3 · PROVIDE THE SOLUTION (the Ground-Up Method) ───────────────
   Her own 3-step process, verbatim framing from the VSL, made them-centric.
   Pays off the "underprepared" open loop from Step 2. */
const METHOD_KICKER = "The Ground-Up Method";
const METHOD_HEADLINE = "Pain was never the enemy.";
const METHOD_HEADLINE_ACCENT = "Low capacity was."; // italic green
const METHOD_SUBHEAD =
  "When the chain below your knee is weak, the knee absorbs load it was never designed to handle. Creams and adjustments chase relief. Rebuilding capacity, from the ground up, is what makes pain leave and stay gone.";
const METHOD_STEPS: {
  num: string;
  Icon: typeof Brain;
  title: string;
  text: string;
}[] = [
  {
    num: "01",
    Icon: Brain,
    title: "Believe it first",
    text: "Your body follows what your brain believes. Before a single exercise, you learn to envision yourself pain free. It sounds soft. It decides who gets results.",
  },
  {
    num: "02",
    Icon: Crosshair,
    title: "Find your imbalances",
    text: "Quad dominant? Weak hips? Glutes that stopped showing up? Until the real imbalances are found, nothing else can move forward. Every plan starts here.",
  },
  {
    num: "03",
    Icon: TrendingUp,
    title: "Rebuild from the ground up",
    text: "Feet, ankles, calves, hamstrings, glutes. Strengthened at a pain-free level and progressed only when you're ready, until your knee stops carrying load it was never built to carry.",
  },
];
// Progressive ramp across the 3 steps in her green (light -> dark).
const METHOD_CARD_THEMES: { bg: string; light: boolean }[] = [
  { bg: "#e3f5ee", light: false },
  { bg: "#93d8c0", light: false },
  { bg: "#16a07c", light: true },
];
// The one rule that never bends — her session rule #1, verbatim. Gets its
// own callout treatment, not a plain closing line, per Josh's request.
const METHOD_RULE = "You never push through pain.";
const METHOD_RULE_SUB = "Not on day one. Not on day ninety. No exceptions.";
const METHOD_CLOSER = "It's never too late to start.";

/* ─── STEP 4 · PRESENT CREDENTIALS (Meet Narine) ──────────────────────────
   Sources: wiki/identity/founder-profile.md + origin-story.md. Third person
   here (bio section, not benefit copy) — mirrors Mason's "Meet Mason" block.
   Photo: P1955242 from the "Pics for website" Drive folder, cropped 4:5. */
const MEET_KICKER = "Meet Narine";
const MEET_HEADLINE = "She's been exactly where you are.";
const MEET_HEADLINE_ACCENT = "And she got out."; // italic green
const MEET_BODY: string[] = [
  "Before any of this, Narine spent a year in chronic knee pain that chiropractors, creams, and rest couldn't fix. She lost her job in the same stretch. Some mornings the only question was how bad today would be.",
  "The turning point was the same insight this method is built on: her body wasn't broken, it was underprepared. She rebuilt it from the ground up and got back to Judo and Muay Thai, pain free, at 31. She's been running that same rebuild for her clients ever since.",
];
const MEET_PHOTO = "/narine-meet-photo.jpg";
const MEET_STATS: { Icon: typeof Award; label: string }[] = [
  { Icon: Award, label: "ATG Certified Coach" },
  { Icon: Users, label: "55+ people out of pain" },
  { Icon: MapPin, label: "Burbank, CA & online" },
];

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
            <Link
              to="/contact"
              className="group px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-[#16a07c]/25 flex items-center gap-2"
            >
              {HERO_CTA_LABEL}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Credibility strip — auto-scrolling Google + Yelp review banner */}
      <Reviews />

      {/* STEP 2 · Identify the problem — problem-agitate */}
      <motion.section
        className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            {PROBLEM_KICKER}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
            {PROBLEM_HEADLINE}{" "}
            <span className="italic text-green-brand">{PROBLEM_HEADLINE_ACCENT}</span>
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
            {PROBLEM_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="font-serif italic text-slate-900">{PROBLEM_QUIET_QUESTION}</p>
            <p className="text-slate-900 font-medium">{PROBLEM_CLOSER}</p>
          </div>
        </div>
      </motion.section>

      {/* STEP 3 · Provide the solution — the Ground-Up Method */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(22,160,124,0.06)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,23,42,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {METHOD_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {METHOD_HEADLINE}{" "}
              <span className="italic text-green-brand">
                {METHOD_HEADLINE_ACCENT}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
              {METHOD_SUBHEAD}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {METHOD_STEPS.map(({ num, Icon, title, text }, i) => {
              const theme = METHOD_CARD_THEMES[i];
              return (
                <motion.div
                  key={num}
                  className="group relative rounded-2xl p-8 shadow-md overflow-hidden cursor-default hover:shadow-2xl hover:brightness-[1.04] transition-[box-shadow,filter] duration-300"
                  style={{ backgroundColor: theme.bg }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.035, y: -6 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                >
                  <span
                    className={`absolute top-4 right-5 text-6xl leading-none font-serif font-semibold select-none ${
                      theme.light ? "text-white/30" : "text-green-brand/30"
                    }`}
                  >
                    {num}
                  </span>
                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      theme.light ? "bg-white/15" : "bg-white/70"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        theme.light ? "text-white" : "text-green-brand"
                      }`}
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3
                    className={`relative text-xl font-serif mb-3 ${
                      theme.light ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`relative font-normal leading-relaxed ${
                      theme.light ? "text-white/85" : "text-slate-700"
                    }`}
                  >
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* The one rule that never bends — called out on its own, not buried in a sentence */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border-2 border-green-brand-50 bg-green-brand-50/60 px-7 py-6 max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span
              className="shrink-0 w-11 h-11 rounded-full bg-green-brand text-white flex items-center justify-center text-lg font-serif font-semibold"
              aria-hidden="true"
            >
              !
            </span>
            <div>
              <p className="text-2xl md:text-3xl font-serif font-semibold text-green-brand-dark leading-snug">
                {METHOD_RULE}
              </p>
              <p className="text-slate-600 mt-1">{METHOD_RULE_SUB}</p>
            </div>
          </motion.div>

          <p className="mt-6 text-lg md:text-xl text-slate-900 font-medium max-w-2xl">
            {METHOD_CLOSER}
          </p>
        </div>
      </section>

      {/* STEP 4 · Present credentials — Meet Narine */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="relative w-full aspect-[46/75] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-green-brand/10 bg-gradient-to-br from-green-brand to-green-brand-dark"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white/25 font-serif text-7xl select-none">
              KA
            </span>
            <img
              src={MEET_PHOTO}
              alt="Narine, founder of Knee Ability Narine, at her Burbank gym"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {MEET_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
              {MEET_HEADLINE}{" "}
              <span className="italic text-green-brand">{MEET_HEADLINE_ACCENT}</span>
            </h2>
            <div className="space-y-5 text-lg text-slate-700 font-normal leading-relaxed">
              {MEET_BODY.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {MEET_STATS.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-700">
                  <Icon className="w-5 h-5 text-green-brand" strokeWidth={1.75} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-green-brand text-white text-base font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-lg shadow-green-brand/20"
            >
              Read her full story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOMEPAGE = 12-STEP SALES LETTER (Joshua's template, 2026-07-23).
          Built section by section with Josh:
           1. Get attention        → Hero above (headline + subhead)
           2. ✅ built above
           3. ✅ built above
           4. ✅ built above
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
