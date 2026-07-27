import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Brain,
  Crosshair,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Mountain,
  Moon,
  Footprints,
  Dumbbell,
  ShieldCheck,
  Play,
  Instagram,
  X,
  Calendar,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
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

/* ─── STEP 5 · SHOW THE BENEFITS (future-state payoff) ────────────────────
   Zero I/me/my — every line addressed straight to the reader. Pulled from
   real client outcomes in reviews.ts (hikes, no more Advil, 20k-step
   vacation days, back to sport) so nothing here is invented. */
const BENEFITS_KICKER = "What changes";
const BENEFITS_HEADLINE = "This is what your life looks like";
const BENEFITS_HEADLINE_ACCENT = "on the other side."; // italic green
const BENEFITS_SUBHEAD =
  "Not just less pain. The parts of your life you quietly stopped planning around, back on the calendar.";
const BENEFITS: { Icon: typeof Mountain; title: string; text: string }[] = [
  {
    Icon: Mountain,
    title: "Hike the trails you used to skip",
    text: "The harder ones too. Not just the flat loop you settled for.",
  },
  {
    Icon: Moon,
    title: "Sleep through the night",
    text: "No more reaching for Advil at 2 a.m. just to get a few hours.",
  },
  {
    Icon: Users,
    title: "Play with your kids without scanning your body first",
    text: "No mental checklist of what your knee can handle before you say yes.",
  },
  {
    Icon: Footprints,
    title: "Keep up on your feet, all day",
    text: "20,000 steps on vacation, and you feel good the next morning too.",
  },
  {
    Icon: Dumbbell,
    title: "Get back to the sport you love",
    text: "Dancing, golf, martial arts, wrestling — whatever you had to quietly give up.",
  },
  {
    Icon: ShieldCheck,
    title: "Trust your body again",
    text: "No surgery, no shots, no steroids. Just a body that finally holds up.",
  },
];

/* ─── STEP 6 · SOCIAL PROOF (video testimonials) ──────────────────────────
   The Google/Yelp carousel under the hero is the early trust strip; this is
   the deeper proof layer — real clients telling their own story, unscripted.
   Sourced verbatim (names + outcome lines) from "Testimonials & reviews
   links.docx" in Narine's Drive. Each links out to the real Instagram post —
   no video is rehosted, no outcome is invented. */
const PROOF_KICKER = "Real stories";
const PROOF_HEADLINE = "Hear it from people who were";
const PROOF_HEADLINE_ACCENT = "exactly where you are."; // italic green
const PROOF_SUBHEAD =
  "Every video below is a real client, unscripted. Tap one to watch it right here.";
// Turns a public Instagram post URL into its embeddable player URL, so the
// video plays inline in a modal — visitors never leave the site.
function instagramEmbedUrl(url: string): string {
  const clean = url.endsWith("/") ? url : `${url}/`;
  return `${clean}embed/captioned`;
}
const VIDEO_TESTIMONIALS: { name: string; outcome: string; url: string }[] = [
  {
    name: "Ruzanna",
    outcome: "18 years of knee pain from a bad surgery, meniscus tear — rehabbed in 5 months.",
    url: "https://www.instagram.com/p/DE1XWxQRqdW/",
  },
  {
    name: "Haley",
    outcome: "Hamstring & calf strain — rehabbed and running marathons in 1 month.",
    url: "https://www.instagram.com/p/C6PmADNvvVG/",
  },
  {
    name: "Arghist",
    outcome: "Over a year of knee pain — rehabbed in 2 months, back on the mats and winning competitions.",
    url: "https://www.instagram.com/p/DQpZ8QQEuv5/",
  },
  {
    name: "Luiza",
    outcome: "Over 2 years of hip, back & groin pain — rehabbed in 6–7 months.",
    url: "https://www.instagram.com/p/DPxrKbukVUu/",
  },
  {
    name: "Anoushka",
    outcome: "Bad knee pain after surgery — back to dancing after 9 months.",
    url: "https://www.instagram.com/p/DN4n0GiES9m/",
  },
  {
    name: "John",
    outcome: "3 knee surgeries, 13+ years of pain — out of pain in months, now running 5–10Ks and Spartan races.",
    url: "https://www.instagram.com/p/DYDHyEBvyMG/",
  },
  {
    name: "Mary",
    outcome: "Couldn't hike or travel after knee surgery — back to steep hikes, pain free.",
    url: "https://www.instagram.com/p/DYiA6tyPmJt/",
  },
  {
    name: "Christine",
    outcome: "Bad back pain, scoliosis, and knee pain — pain free.",
    url: "https://www.instagram.com/p/DJKFGnvveZA/",
  },
];
// Cycling background ramp for the video cards — her green + navy palette.
const PROOF_CARD_THEMES = [
  "linear-gradient(135deg, #16a07c 0%, #0e7a5e 100%)",
  "linear-gradient(135deg, #16324f 0%, #0d1f33 100%)",
  "linear-gradient(135deg, #2fbf94 0%, #16a07c 100%)",
  "linear-gradient(135deg, #0e7a5e 0%, #16324f 100%)",
];

/* ─── STEP 7 · MAKE THE OFFER (free consult) ──────────────────────────────
   Sourced from wiki/offers/offer-architecture.md — the confirmed entry
   funnel (free consult → body assessment → personalised plan). No prices
   here: her packages vary and are due to change, so the offer step stays
   about what happens, not dollar figures. */
const OFFER_KICKER = "How it starts";
const OFFER_HEADLINE = "It starts with one free consult.";
const OFFER_HEADLINE_ACCENT = "No pressure, no obligation."; // italic green
const OFFER_SUBHEAD =
  "You don't need a diagnosis or a plan before you reach out. You just need to be done guessing.";
const OFFER_STEPS: { Icon: typeof Calendar; title: string; text: string }[] = [
  {
    Icon: Calendar,
    title: "A free consult",
    text: "A real conversation about what's going on with your knee and what's actually possible from here.",
  },
  {
    Icon: ClipboardCheck,
    title: "A full body assessment",
    text: "Where your imbalances are, what's really driving the pain, and what your plan needs to include.",
  },
  {
    Icon: Sparkles,
    title: "A plan built around you",
    text: "1:1 training, mobility work, and nutrition guidance — plus weekly check-ins and text support between sessions.",
  },
];
const OFFER_CLOSER =
  "Most people feel a difference by the end of the very first session.";
const OFFER_CTA_LABEL = "Book Your Free Consult";

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<{ name: string; url: string } | null>(null);

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

      {/* STEP 5 · Show the benefits — future-state payoff, them-centric */}
      <motion.section
        className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {BENEFITS_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {BENEFITS_HEADLINE}{" "}
              <span className="italic text-green-brand">{BENEFITS_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
              {BENEFITS_SUBHEAD}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                className="rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              >
                <div className="w-11 h-11 rounded-xl bg-green-brand-50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-green-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-serif text-slate-900 mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* STEP 6 · Social proof — video testimonials, real clients, real names */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {PROOF_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {PROOF_HEADLINE}{" "}
              <span className="italic text-green-brand">{PROOF_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
              {PROOF_SUBHEAD}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TESTIMONIALS.map(({ name, outcome, url }, i) => (
              <motion.button
                key={name}
                type="button"
                onClick={() => setActiveVideo({ name, url })}
                className="group relative block w-full text-left aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
                style={{ backgroundImage: PROOF_CARD_THEMES[i % PROOF_CARD_THEMES.length] }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              >
                <Instagram
                  className="absolute top-4 right-4 w-5 h-5 text-white/70"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-transform duration-300">
                    <Play className="w-5 h-5 text-green-brand-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
                  <p className="text-white font-serif text-lg mb-1">{name}</p>
                  <p className="text-white/85 text-sm leading-snug">{outcome}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Inline video modal — plays right on the page, no navigation away */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveVideo(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeVideo.name} testimonial video`}
            >
              <motion.div
                className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
                <iframe
                  key={activeVideo.url}
                  src={instagramEmbedUrl(activeVideo.url)}
                  className="w-full aspect-[9/16] max-h-[80vh] bg-black"
                  frameBorder={0}
                  scrolling="no"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`${activeVideo.name} testimonial`}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STEP 7 · Make the offer — free consult, them-centric, no prices */}
      <motion.section
        className="relative bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_100%,rgba(22,160,124,0.07)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {OFFER_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {OFFER_HEADLINE}{" "}
              <span className="italic text-green-brand">{OFFER_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
              {OFFER_SUBHEAD}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {OFFER_STEPS.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                className="relative rounded-2xl bg-white p-8 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                <span className="absolute top-5 right-6 text-4xl font-serif font-semibold text-green-brand/20 select-none">
                  {i + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-green-brand-50 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-green-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-700 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-green-brand/20"
            >
              {OFFER_CTA_LABEL}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-slate-700 font-medium max-w-sm">{OFFER_CLOSER}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* HOMEPAGE = 12-STEP SALES LETTER (Joshua's template, 2026-07-23).
          Built section by section with Josh:
           1. Get attention        → Hero above (headline + subhead)
           2. ✅ built above
           3. ✅ built above
           4. ✅ built above
           5. ✅ built above
           6. ✅ built above
           7. ✅ built above
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
