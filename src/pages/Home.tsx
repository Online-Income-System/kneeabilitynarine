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
  Globe,
  Star,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import { GOOGLE } from "../data/reviews";

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
const PROBLEM_HEADLINE = "The pain isn't only in your knee.";
const PROBLEM_HEADLINE_ACCENT = "It's controlling your whole day."; // italic green
const PROBLEM_BODY: string[] = [
  "It starts before you're even out of bed. You scan your body to check what hurts today and calculate what you can get away with. Stairs get planned around. Hikes get declined. Sleep gets interrupted. Somewhere along the way, you stopped trusting your own body.",
  "So you did the responsible things. You rested it. You finished physical therapy and got handed back \u201cbasic function.\u201d You tried the creams, the cortisone, maybe even the surgery. Each one promised relief and delivered a countdown to the next flare-up. That is not healing. That is an injury loop.",
];
const PROBLEM_HARD_QUESTION =
  "And on the bad days, one question keeps coming back: what if this is life now?";
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
  "At 30, a knee injury during jiu jitsu turned into chronic pain. She lost her job at the same time. Some mornings the only question was how bad today would be.",
  "The turning point was the same insight this method is built on: her body wasn't broken, it was underprepared. She rebuilt it from the ground up, and by 31 she was training pain free again, Judo first, then Muay Thai the year after. She's been running that same rebuild for her clients ever since.",
];
const MEET_PHOTO = "/narine-meet-photo.jpg";
const MEET_STATS: { Icon: typeof Award; label: string }[] = [
  { Icon: Award, label: "ATG Certified Coach" },
  { Icon: Users, label: "75+ people out of pain" },
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
  "Not only less pain. The hobbies and activities you avoided, back on the calendar.";
const BENEFITS: { Icon: typeof Mountain; title: string; text: string }[] = [
  {
    Icon: Dumbbell,
    title: "Get back to the sport you love",
    text: "Dancing, golf, martial arts, wrestling — whatever you had to give up.",
  },
  {
    Icon: Mountain,
    title: "Hike the trails you used to skip",
    text: "The harder ones too. Not the flat loop you settled for.",
  },
  {
    Icon: Moon,
    title: "Sleep through the night",
    text: "No more reaching for Advil at 2 a.m. to get a few hours.",
  },
  {
    Icon: Users,
    title: "Play with your kids without scanning your body first",
    text: "No mental checklist of what your knee or back can handle before you say yes.",
  },
  {
    Icon: Footprints,
    title: "Stay on your feet all day, without pain",
    text: "20,000 steps on vacation, and you feel good the next morning too.",
  },
  {
    Icon: ShieldCheck,
    title: "Trust your body again",
    text: "No surgery, no shots, no steroids. A body that finally holds up.",
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
    name: "John",
    outcome: "3 knee surgeries, 13+ years of pain — out of pain in months, now running 5–10Ks and Spartan races.",
    url: "https://www.instagram.com/p/DYDHyEBvyMG/",
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

/* ─── STEP 7 · MAKE THE OFFER (free call) ──────────────────────────────
   Sourced from wiki/offers/offer-architecture.md — the confirmed entry
   funnel (free call → body assessment → personalised plan). No prices
   here: her packages vary and are due to change, so the offer step stays
   about what happens, not dollar figures. */
const OFFER_KICKER = "How it starts";
const OFFER_HEADLINE = "It starts with a conversation.";
const OFFER_HEADLINE_ACCENT = ""; // no accent line needed for this shorter headline
const OFFER_SUBHEAD =
  "You don't need a diagnosis or a plan before you reach out.";
const OFFER_STEPS: { Icon: typeof Calendar; title: string; text: string }[] = [
  {
    Icon: Calendar,
    title: "A free call",
    text: "A transparent conversation about the pain you're feeling and what's actually possible.",
  },
  {
    Icon: ClipboardCheck,
    title: "A full body assessment",
    text: "Where your imbalances are, what's really driving the pain, and what your plan needs to include.",
  },
  {
    Icon: Sparkles,
    title: "A plan built around you",
    text: "1:1 rehab and strength training, and mobility work; plus weekly check-ins and text support between sessions.",
  },
];
const OFFER_CLOSER =
  "Most people feel a difference by the end of the very first session.";
const OFFER_CTA_LABEL = "Book Your Free Call";

/* ─── STEP 8 · INJECT SCARCITY (real capacity, not a countdown) ───────────
   Sourced from wiki/offers/offer-architecture.md: in-person capacity is
   +2-3 spots, online +5-10; her stated pricing philosophy is to raise
   prices once a tier hits capacity. Deliberately no invented numbers or
   fake timers — the constraint is 1:1 attention itself. */
const SCARCITY_KICKER = "Why now";
const SCARCITY_HEADLINE = "1:1 attention doesn't scale.";
const SCARCITY_HEADLINE_ACCENT = "That's on purpose."; // italic green
const SCARCITY_SUBHEAD =
  "Every plan is built around one person at a time, which means there's a real limit to how many people can be on it.";
const SCARCITY_ITEMS: { Icon: typeof MapPin; title: string; text: string }[] = [
  {
    Icon: MapPin,
    title: "In-person, Burbank, CA",
    text: "Only a couple of new spots open at a time. When they're full, they're full until someone completes their program.",
  },
  {
    Icon: Globe,
    title: "Online, anywhere",
    text: "More room here, but it's still capped — not an open enrollment.",
  },
];
const SCARCITY_CLOSER =
  "When a tier fills up, the price for the next person goes up. Reaching out now costs less than waiting until it does.";

/* ─── STEP 9 · THE GUARANTEE ───────────────────────────────────────────────
   Her verbatim guarantee: "My guarantee is that if you follow my program,
   you will become stronger, more mobile and pain free." Reframed them-
   centric (zero I/me/my) — third-person attribution in the kicker only,
   same pattern as the Meet Narine bio section. Echoes the hero's closing
   line for a full-circle callback.

   Fine print reframed 2026-08-01 per Narine's own "anti-guarantee": she
   doesn't offer refunds (it's in all her contracts), and when asked "what
   if it doesn't work," her real answer is that results depend entirely on
   following her coaching. Written here as an honest, confident policy
   statement rather than a hedge — no refunds, because the only thing that
   determines the outcome is the client's own follow-through, so she only
   takes on people who are genuinely all in. Bumped up from the smallest
   fine-print treatment to a slightly more readable size, since this is a
   real trust signal, not legal boilerplate. */
const GUARANTEE_KICKER = "Her Guarantee";
const GUARANTEE_HEADLINE = "Follow the program,";
const GUARANTEE_HEADLINE_ACCENT = "and you will get stronger, more mobile, and pain free."; // italic green
const GUARANTEE_SUBHEAD =
  "No matter how long you've been in pain or how much you've already tried.";
const GUARANTEE_FINE_PRINT =
  "There are no refunds. The only thing that determines the result is following the coaching, so she only takes on clients who are ready to be all in. The same standard she holds herself to with every one of them, in-person or online.";

/* ─── STEP 10 · CALL TO ACTION ─────────────────────────────────────────────
   The direct ask, after every trust element is stacked up. No more
   explaining — just the invitation and one more proof glance. Routes to
   /contact (no SMS link yet — her real number is still an open item). */
const CTA_HEADLINE = "Your knee or back doesn't have to feel like this forever.";
const CTA_HEADLINE_ACCENT = "Let's find out what's possible."; // italic green
const CTA_SUBHEAD = "One conversation can change everything.";
const CTA_BUTTON_LABEL = "Book Your Free Call";

/* ─── STEP 11 · WARNING (cost of waiting) ─────────────────────────────────
   Grounded in her own stated mechanism (ground-up-method.md: weak capacity
   below the knee means load keeps landing somewhere it was never built to
   land) — not invented fear, the same physiological logic already used in
   Step 3. No red/alarm styling per her brand rules; the icon and palette
   stay in her established slate/green range. No kicker label on this one —
   Josh's call. */
const WARNING_HEADLINE = "Waiting doesn't make this easier.";
const WARNING_HEADLINE_ACCENT = "It makes it harder to undo."; // italic green
const WARNING_BODY: string[] = [
  "Nothing about your situation changes on its own. It keeps happening, week after week.",
  "The longer that pattern runs, the more work it takes to unwind it.",
];
const WARNING_CLOSER =
  "It's not too late to start. But every week you wait is a week you don't get back.";

/* ─── STEP 12 · CLOSE WITH A REMINDER (P.S.) ───────────────────────────────
   Restates the offer + real capacity in one short, skimmable block for
   anyone who jumped straight to the bottom. Them-centric, no new claims —
   just a compact echo of what's already been said, plus a final CTA.
   Shortened 2026-08-01 per Narine: the original long version (below) was
   meant to convey the heart of it to Josh, then get condensed for the
   actual site — not ship at full length. Replaced with her own shortened
   version, verbatim. */
const PS_BODY: string[] = [
  "If you skimmed straight to the bottom: it starts with one free call. In-person spots are limited, and online fills up too. Training with Narine isn't about following a cookie-cutter rehab program; she knows when to have you progress, when to regress, and how to rehab multiple injuries that work together so you can actually get out of pain safely. Hike again. Dance again. Sleep through the night again. That's what's actually possible from here.",
];
const PS_CTA_LABEL = "Book Your Free Call";

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
            <p className="font-serif italic text-slate-900">{PROBLEM_HARD_QUESTION}</p>
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
              alt="Narine, founder of Knee Ability Narine, at her gym in Burbank, CA"
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

      {/* STEP 7 · Make the offer — free call, them-centric, no prices */}
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
              {OFFER_HEADLINE}
              {OFFER_HEADLINE_ACCENT && (
                <>
                  {" "}
                  <span className="italic text-green-brand">{OFFER_HEADLINE_ACCENT}</span>
                </>
              )}
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

      {/* STEP 8 · Inject scarcity — real capacity, not a fake countdown */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {SCARCITY_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {SCARCITY_HEADLINE}{" "}
              <span className="italic text-green-brand">{SCARCITY_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
              {SCARCITY_SUBHEAD}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {SCARCITY_ITEMS.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                className="rounded-2xl border-2 border-navy-brand/10 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy-brand flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-700 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-xl md:text-2xl font-serif text-navy-brand leading-snug max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {SCARCITY_CLOSER}
          </motion.p>
        </div>
      </section>

      {/* STEP 9 · The guarantee — her verbatim promise, reframed them-centric */}
      <motion.section
        className="relative bg-navy-brand py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_50%_0%,rgba(22,160,124,0.18)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(60% 55% at 50% 30%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(60% 55% at 50% 30%, black 0%, transparent 78%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="inline-flex w-14 h-14 rounded-full bg-white/10 items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ShieldCheck className="w-7 h-7 text-green-brand" strokeWidth={1.75} />
          </motion.div>

          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            {GUARANTEE_KICKER}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-6">
            {GUARANTEE_HEADLINE}{" "}
            <span className="italic text-green-brand">{GUARANTEE_HEADLINE_ACCENT}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-8">
            {GUARANTEE_SUBHEAD}
          </p>
          <p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            {GUARANTEE_FINE_PRINT}
          </p>
        </div>
      </motion.section>

      {/* STEP 10 · Call to action — the direct ask */}
      <motion.section
        className="bg-white py-24 md:py-32 px-6 md:px-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight text-slate-900 mb-6">
            {CTA_HEADLINE}{" "}
            <span className="italic text-green-brand">{CTA_HEADLINE_ACCENT}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10">
            {CTA_SUBHEAD}
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 px-9 py-4.5 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-green-brand/25"
          >
            {CTA_BUTTON_LABEL}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-600 text-sm">
            <div className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-star-gold" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>
              {GOOGLE.rating.toFixed(1)} stars · {GOOGLE.reviewCount} Google reviews
            </span>
          </div>
        </div>
      </motion.section>

      {/* STEP 11 · Warning — the cost of waiting */}
      <motion.section
        className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-8">
            <AlertTriangle className="w-6 h-6 text-slate-700" strokeWidth={1.75} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
            {WARNING_HEADLINE}{" "}
            <span className="italic text-green-brand">{WARNING_HEADLINE_ACCENT}</span>
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-700 font-normal leading-relaxed mb-8">
            {WARNING_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-serif text-slate-900 leading-snug">
            {WARNING_CLOSER}
          </p>
        </div>
      </motion.section>

      {/* STEP 12 · Close with a reminder — a short P.S. block before the footer */}
      <motion.section
        className="bg-white py-20 md:py-28 px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-2xl mx-auto border-l-4 border-green-brand pl-7 md:pl-9">
          <p className="font-serif italic text-xl md:text-2xl text-slate-900 leading-relaxed mb-3">
            P.S.
          </p>
          <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-8">
            {PS_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-brand text-white text-base font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-lg shadow-green-brand/20"
          >
            {PS_CTA_LABEL}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.section>

      {/* HOMEPAGE = 12-STEP SALES LETTER (Joshua's template, 2026-07-23).
          All 12 steps built section by section with Josh, v1 complete:
          1. Hero  2. Problem  3. Ground-Up Method  4. Meet Narine
          5. Benefits  6. Video testimonials  7. The offer  8. Scarcity
          9. Guarantee  10. CTA  11. Warning  12. P.S. close (above). */}
    </div>
  );
}
