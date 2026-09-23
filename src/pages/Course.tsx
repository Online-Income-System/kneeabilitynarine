import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Dumbbell,
  StretchHorizontal,
  ClipboardList,
  Mountain,
  Moon,
  Footprints,
  ShieldCheck,
  Users,
  Award,
  MapPin,
  Clock,
  Play,
  Instagram,
  X,
  Star,
  AlertTriangle,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import { GOOGLE } from "../data/reviews";
import Seo from "../components/Seo";
import { graph, localBusinessSchema, personSchema } from "../lib/schema";

/* ─────────────────────────────────────────────────────────────────────────
   COURSE SALES PAGE: Knee Ability Rehab Program ($397, self-paced).

   UNLISTED ON PURPOSE. This page is its own link to send people, not part
   of the website: noindex, excluded from sitemap.xml, and nothing on the
   site links here. Keep it that way unless Joshua says otherwise.

   Structure mirrors the homepage's 12-step sales letter (Joshua's
   template). Step 9 (guarantee) is left out, same as the homepage: the
   course's guarantee/refund terms are still unconfirmed with Narine, so
   nothing is claimed either way. The FAQ sits in that slot instead.

   Course facts come only from her live Pillar page (read 2026-09-23):
   name, $397 price, 15 exercises, 5 guided stretches, anytime/anywhere
   access, accountability worksheets, and the John / Lola / Russ quotes.
   Everything else is her already-approved site copy.

   The $595 "was" price on her Pillar page is deliberately NOT shown here
   until it's confirmed it was a real former price.
   ───────────────────────────────────────────────────────────────────────── */

const COURSE_NAME = "Knee Ability Rehab Program";
const COURSE_PRICE = "$397";
// Straight to her Pillar checkout. External URL, so plain <a>, not Link.
const CHECKOUT_HREF =
  "https://pillar.io/kneeabilitynarine/checkout/0147d9c0-6798-11ee-a21d-a3e35b1bdc1d";
const CTA_LABEL = `Get the program, ${COURSE_PRICE}`;

/* ─── STEP 1 · HERO ────────────────────────────────────────────────────── */
const HERO_KICKER = "Self-paced course · Knee Ability Rehab Program";
// Same headline as the homepage, per Joshua 2026-09-23.
const HERO_HEADLINE = "Get out of knee and back pain.";
const HERO_HEADLINE_ACCENT = "Without surgery, shots, or steroids.";
const HERO_SUBHEADLINE =
  "15 exercises. 5 guided stretches. Built on the same method Narine uses with her 1:1 clients. Watch it anytime, anywhere.";

/* ─── STEP 2 · IDENTIFY THE PROBLEM ───────────────────────────────────── */
const PROBLEM_KICKER = "Sound familiar?";
const PROBLEM_HEADLINE = "Your knee hurts before you even get out of bed.";
const PROBLEM_HEADLINE_ACCENT = "And it runs your whole day.";
const PROBLEM_BODY: string[] = [
  "You check what hurts before you stand up. You plan around the stairs. You say no to the hike. The pain wakes you up at night.",
  "So you did what you were told. You rested it. You finished PT. You tried the creams, the shots, maybe even surgery. Each one helped for a while. Then the pain came back.",
];
const PROBLEM_HARD_QUESTION = "On the bad days, you start to wonder: is this just life now?";
// Her own core belief, from her 2026-08-20 notes.
const PROBLEM_CLOSER = "Narine's answer: no pain is normal at any age, and it can be rehabbed.";

/* ─── STEP 3 · PROVIDE THE SOLUTION ───────────────────────────────────── */
const METHOD_KICKER = "The Ground-Up Method";
const METHOD_HEADLINE = "Your knee is carrying load";
const METHOD_HEADLINE_ACCENT = "the rest of your leg should carry.";
const METHOD_SUBHEAD =
  "When your feet, ankles, calves and hips are weak, your knee picks up the slack. This program builds them back up, from the ground up, so your knee stops doing all the work.";
const METHOD_STEPS: { num: string; Icon: typeof Dumbbell; title: string; text: string }[] = [
  {
    num: "01",
    Icon: Dumbbell,
    title: "Build strength",
    text: "15 exercises to get your recovery started and make the muscles around your knee strong again.",
  },
  {
    num: "02",
    Icon: StretchHorizontal,
    title: "Loosen up",
    text: "5 guided stretches to help you get more flexible and move better. Tight muscles pull on your knee.",
  },
  {
    num: "03",
    Icon: ClipboardList,
    title: "Track your progress",
    text: "Worksheets to write down what you did and how it felt, so you can see yourself getting better.",
  },
];
const METHOD_CARD_THEMES: { bg: string; light: boolean }[] = [
  { bg: "#e3f5ee", light: false },
  { bg: "#93d8c0", light: false },
  { bg: "#16a07c", light: true },
];
// Her core message #1, from her 2026-08-20 notes. Matters more in a
// self-paced course than anywhere else, since she isn't there to stop you.
const METHOD_RULE = "You never push through pain.";
const METHOD_RULE_SUB =
  "If an exercise hurts, go easier. You may not be strong enough for it yet, and that's okay.";
const METHOD_CLOSER = "It's never too late to start.";

/* ─── STEP 4 · PRESENT CREDENTIALS (homepage copy, already approved) ─── */
const MEET_KICKER = "Meet Narine";
const MEET_HEADLINE = "She's been exactly where you are.";
const MEET_HEADLINE_ACCENT = "And she got out.";
const MEET_BODY: string[] = [
  "At 30, a knee injury during jiu jitsu turned into chronic pain. She lost her job at the same time. Some mornings the only question was how bad today would be.",
  "She rebuilt her body from the ground up, and by 31 she was training pain free again, Judo first, then Muay Thai the year after. She's been running that same rebuild for her clients ever since. This course is that method, put together so you can do it yourself.",
];
const MEET_PHOTO = "/narine-meet-photo.jpg";
const MEET_STATS: { Icon: typeof Award; label: string }[] = [
  { Icon: Award, label: "ATG Certified Coach" },
  { Icon: Users, label: "75+ people out of pain" },
  { Icon: MapPin, label: "Burbank, CA & online" },
];

/* ─── STEP 5 · SHOW THE BENEFITS ──────────────────────────────────────
   Real outcomes from her 1:1 clients (reviews.ts), framed honestly as
   what her clients got back, not as promised course results. */
const BENEFITS_KICKER = "What changes";
const BENEFITS_HEADLINE = "This is what her clients";
const BENEFITS_HEADLINE_ACCENT = "got back.";
const BENEFITS_SUBHEAD = "The course is built on the same method.";
const BENEFITS: { Icon: typeof Mountain; title: string; text: string }[] = [
  {
    Icon: Dumbbell,
    title: "The sport they love",
    text: "Dancing, golf, martial arts, wrestling. Whatever they had to give up.",
  },
  {
    Icon: Mountain,
    title: "The hikes they used to skip",
    text: "The steep ones too, not the flat loop they settled for.",
  },
  {
    Icon: Moon,
    title: "A full night's sleep",
    text: "No more reaching for Advil at 2 a.m.",
  },
  {
    Icon: Users,
    title: "Time with their kids",
    text: "Saying yes without checking what their knee can handle first.",
  },
  {
    Icon: Footprints,
    title: "A day on their feet",
    text: "20,000 steps on vacation, and feeling good the next morning.",
  },
  {
    Icon: ShieldCheck,
    title: "Trust in their body",
    text: "No surgery, no shots, no steroids.",
  },
];

/* ─── STEP 6 · SOCIAL PROOF ────────────────────────────────────────────
   Written quotes: verbatim from her Pillar course page. Videos: same real
   Instagram testimonials as the homepage. All are people she has trained. */
const PROOF_KICKER = "Real stories";
const PROOF_HEADLINE = "Hear it from people who were";
const PROOF_HEADLINE_ACCENT = "exactly where you are.";
const PROOF_SUBHEAD =
  "These are people Narine has trained with this method. Tap a video to watch it here.";
const QUOTES: { name: string; text: string }[] = [
  {
    name: "John",
    text: "After more than a decade of different PT therapies, I finally feel I'm addressing my knee pain properly and making significant progress, thanks to Narine.",
  },
  {
    name: "Lola",
    text: "I am very tall and my knees aren't strong enough for longevity. I have felt stronger and better in my body after working with Narine and it's only been 5 weeks. Can't wait to see where this leads me!",
  },
  {
    name: "Russ",
    text: "My lower body, especially my knee feels absolutely amazing. I understand the healing process has ups and downs, but I'm basking in the feeling I have today.",
  },
];
function instagramEmbedUrl(url: string): string {
  const clean = url.endsWith("/") ? url : `${url}/`;
  return `${clean}embed/captioned`;
}
const VIDEO_TESTIMONIALS: { name: string; outcome: string; url: string }[] = [
  {
    name: "Ruzanna",
    outcome: "18 years of knee pain from a bad surgery, meniscus tear. Rehabbed in 5 months.",
    url: "https://www.instagram.com/p/DE1XWxQRqdW/",
  },
  {
    name: "John",
    outcome: "3 knee surgeries, 13+ years of pain. Now running 5 to 10Ks and Spartan races.",
    url: "https://www.instagram.com/p/DYDHyEBvyMG/",
  },
  {
    name: "Arghist",
    outcome: "Over a year of knee pain. Rehabbed in 2 months, back on the mats and winning.",
    url: "https://www.instagram.com/p/DQpZ8QQEuv5/",
  },
  {
    name: "Mary",
    outcome: "Couldn't hike or travel after knee surgery. Back to steep hikes, pain free.",
    url: "https://www.instagram.com/p/DYiA6tyPmJt/",
  },
];
const PROOF_CARD_THEMES = [
  "linear-gradient(135deg, #16a07c 0%, #0e7a5e 100%)",
  "linear-gradient(135deg, #16324f 0%, #0d1f33 100%)",
  "linear-gradient(135deg, #2fbf94 0%, #16a07c 100%)",
  "linear-gradient(135deg, #0e7a5e 0%, #16324f 100%)",
];

/* ─── STEP 7 · MAKE THE OFFER ──────────────────────────────────────────
   Contents verbatim in substance from her Pillar page. */
const OFFER_KICKER = "What you get";
const OFFER_HEADLINE = "Everything inside the";
const OFFER_HEADLINE_ACCENT = `${COURSE_NAME}.`;
const OFFER_ITEMS: { Icon: typeof Dumbbell; title: string; text: string }[] = [
  {
    Icon: Dumbbell,
    title: "15 exercises",
    text: "Picked to get your recovery started and build your strength back up.",
  },
  {
    Icon: StretchHorizontal,
    title: "5 guided stretches",
    text: "Follow along to get more flexible and move better.",
  },
  {
    Icon: Clock,
    title: "Anytime, anywhere",
    text: "Log in whenever it suits you. Go at your own pace.",
  },
  {
    Icon: ClipboardList,
    title: "Accountability worksheets",
    text: "Track what you did and how it felt, so you can see your progress.",
  },
];
// Sets up the Pillar handoff so the change of page isn't a surprise.
const OFFER_NEXT_STEP =
  "When you click, you'll make an account on Narine's course page and pay there. Then you can start right away.";

/* ─── STEP 8 · SCARCITY (real, not a countdown) ───────────────────────
   The only real limit is her 1:1 capacity (homepage Step 8). The course
   is the way to start without waiting for a spot. No fake "limited spots"
   on the course itself. */
const SCARCITY_KICKER = "Why the course";
const SCARCITY_HEADLINE = "Narine only takes a few 1:1 clients at a time.";
const SCARCITY_HEADLINE_ACCENT = "The course has no waitlist.";
const SCARCITY_BODY =
  "In-person spots in Burbank open one or two at a time. When they're full, you wait. The course lets you start her method today, from anywhere.";

/* ─── STEP 9 · FAQ (in the guarantee's slot, see header note) ────────── */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What do I get?",
    a: "15 exercises, 5 guided stretches, and worksheets to track your progress. You can watch them anytime, anywhere.",
  },
  {
    q: "How much is it?",
    a: `${COURSE_PRICE}, one time.`,
  },
  {
    q: "How do I get in?",
    a: "Click the button. You'll make an account on Narine's course page and pay there. Then you can start right away.",
  },
  {
    q: "What if an exercise hurts?",
    a: "Go easier, or stop. Never push through pain. You may not be strong enough for that exercise yet, and that's okay.",
  },
  {
    q: "Is this the same as training with Narine 1:1?",
    a: "No. In 1:1, Narine watches your form every week and changes your plan as you go. The course gives you her method to do on your own. It's a strong start, and a lot better than waiting to see if the pain goes away by itself.",
  },
  {
    q: "What if I need more help than a course?",
    a: "That's what 1:1 is for. Get in touch and Narine will help you work out which one fits you.",
  },
];
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ─── STEP 10 · CALL TO ACTION ─────────────────────────────────────── */
const CTA_HEADLINE = "Your knee doesn't have to feel like this forever.";
const CTA_HEADLINE_ACCENT = "Start the program today.";
const CTA_SUBHEAD = `15 exercises, 5 stretches, and Narine's method, for ${COURSE_PRICE}.`;

/* ─── STEP 11 · WARNING ────────────────────────────────────────────── */
const WARNING_HEADLINE = "The longer you wait,";
const WARNING_HEADLINE_ACCENT = "the harder it is to undo.";
const WARNING_BODY: string[] = [
  "Pain like this keeps coming back, week after week.",
  "The longer that goes on, the more work it takes to fix.",
];
const WARNING_CLOSER = "It's not too late to start. But every week you wait is a week you don't get back.";

/* ─── STEP 12 · P.S. ───────────────────────────────────────────────── */
const PS_BODY =
  `If you skipped to the bottom: the ${COURSE_NAME} is 15 exercises, 5 guided stretches, and worksheets to track your progress. It's built on the same method Narine uses with her 1:1 clients. It's ${COURSE_PRICE}, one time, and you can start today, from anywhere.`;

function CheckoutButton({ size = "lg" }: { size?: "lg" | "md" }) {
  const sizing =
    size === "lg" ? "px-8 py-4 text-lg shadow-xl" : "px-7 py-3.5 text-base shadow-lg";
  return (
    <a
      href={CHECKOUT_HREF}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-green-brand text-white font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-green-brand/25 ${sizing}`}
    >
      {CTA_LABEL}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function Course() {
  const [activeVideo, setActiveVideo] = useState<{ name: string; url: string } | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`${COURSE_NAME} | Knee Ability Narine`}
        description={`Narine's self-paced course: 15 exercises and 5 guided stretches built on the same method she uses with her 1:1 clients. ${COURSE_PRICE}.`}
        path="/course"
        schema={graph(localBusinessSchema(), personSchema(), FAQ_SCHEMA)}
        noindex
      />

      {/* STEP 1 · Hero */}
      <motion.section
        className="relative pt-20 md:pt-24 pb-28 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_50%_8%,rgba(14,147,132,0.10)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 -z-10 opacity-70 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(14,147,132,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(60% 55% at 50% 28%, black 0%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(60% 55% at 50% 28%, black 0%, transparent 78%)",
          }}
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
          <div className="flex flex-col items-center gap-3">
            <CheckoutButton />
            <p className="text-sm text-slate-500">One time. Start today.</p>
          </div>
        </div>
      </motion.section>

      {/* Credibility strip */}
      <Reviews />

      {/* STEP 2 · Problem */}
      <motion.section className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12" {...fadeUp}>
        <div className="max-w-3xl mx-auto">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            {PROBLEM_KICKER}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
            {PROBLEM_HEADLINE} <span className="italic text-green-brand">{PROBLEM_HEADLINE_ACCENT}</span>
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

      {/* STEP 3 · Solution */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(22,160,124,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              {METHOD_KICKER}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {METHOD_HEADLINE} <span className="italic text-green-brand">{METHOD_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">{METHOD_SUBHEAD}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {METHOD_STEPS.map(({ num, Icon, title, text }, i) => {
              const theme = METHOD_CARD_THEMES[i];
              return (
                <motion.div
                  key={num}
                  className="group relative rounded-2xl p-8 shadow-md overflow-hidden"
                  style={{ backgroundColor: theme.bg }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
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
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      theme.light ? "bg-white/15" : "bg-white/70"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${theme.light ? "text-white" : "text-green-brand"}`} strokeWidth={1.75} />
                  </div>
                  <h3 className={`relative text-xl font-serif mb-3 ${theme.light ? "text-white" : "text-slate-900"}`}>
                    {title}
                  </h3>
                  <p className={`relative font-normal leading-relaxed ${theme.light ? "text-white/85" : "text-slate-700"}`}>
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border-2 border-green-brand-50 bg-green-brand-50/60 px-7 py-6 max-w-3xl">
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
          </div>

          <p className="mt-6 text-lg md:text-xl text-slate-900 font-medium max-w-2xl">{METHOD_CLOSER}</p>
        </div>
      </section>

      {/* STEP 4 · Credentials */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative w-full aspect-[46/75] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-green-brand/10 bg-gradient-to-br from-green-brand to-green-brand-dark">
            <img
              src={MEET_PHOTO}
              alt="Narine, founder of Knee Ability Narine, at her gym in Burbank, CA"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">{MEET_KICKER}</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
              {MEET_HEADLINE} <span className="italic text-green-brand">{MEET_HEADLINE_ACCENT}</span>
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
          </div>
        </div>
      </section>

      {/* STEP 5 · Benefits */}
      <motion.section className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12" {...fadeUp}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">{BENEFITS_KICKER}</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {BENEFITS_HEADLINE} <span className="italic text-green-brand">{BENEFITS_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">{BENEFITS_SUBHEAD}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-100 p-7 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-green-brand-50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-green-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-serif text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* STEP 6 · Social proof */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">{PROOF_KICKER}</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              {PROOF_HEADLINE} <span className="italic text-green-brand">{PROOF_HEADLINE_ACCENT}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">{PROOF_SUBHEAD}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {QUOTES.map(({ name, text }) => (
              <figure key={name} className="rounded-2xl bg-slate-50 border border-slate-100 p-7">
                <Quote className="w-6 h-6 text-green-brand mb-4" strokeWidth={1.75} aria-hidden="true" />
                <blockquote className="text-slate-700 leading-relaxed mb-4">"{text}"</blockquote>
                <figcaption className="font-serif text-slate-900">{name}</figcaption>
              </figure>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TESTIMONIALS.map(({ name, outcome, url }, i) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveVideo({ name, url })}
                className="group relative block w-full text-left aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
                style={{ backgroundImage: PROOF_CARD_THEMES[i % PROOF_CARD_THEMES.length] }}
              >
                <Instagram className="absolute top-4 right-4 w-5 h-5 text-white/70" strokeWidth={1.75} aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-green-brand-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
                  <p className="text-white font-serif text-lg mb-1">{name}</p>
                  <p className="text-white/85 text-sm leading-snug">{outcome}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeVideo.name} testimonial video`}
            >
              <div
                className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STEP 7 · The offer */}
      <motion.section
        className="relative bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        {...fadeUp}
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">{OFFER_KICKER}</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900">
              {OFFER_HEADLINE} <span className="italic text-green-brand">{OFFER_HEADLINE_ACCENT}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {OFFER_ITEMS.map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-5 rounded-2xl bg-white p-7 shadow-md">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-green-brand-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-brand" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-700 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white border-2 border-green-brand/20 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="shrink-0">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-1">{COURSE_NAME}</p>
              <p className="text-6xl font-serif font-medium text-slate-900">{COURSE_PRICE}</p>
              <p className="text-slate-600 mt-1">One time.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <CheckoutButton />
              <p className="text-slate-600 text-sm max-w-md">{OFFER_NEXT_STEP}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STEP 8 · Scarcity (real) */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">{SCARCITY_KICKER}</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
            {SCARCITY_HEADLINE} <span className="italic text-green-brand">{SCARCITY_HEADLINE_ACCENT}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed">{SCARCITY_BODY}</p>
        </div>
      </section>

      {/* STEP 9 · FAQ (guarantee slot) */}
      <section className="bg-slate-50 border-y border-slate-100 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">Questions</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-10">
            Before you <span className="italic text-green-brand">get started.</span>
          </h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg text-slate-900">
                  {q}
                  <span className="text-green-brand text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-slate-700 leading-relaxed mt-3">
                  {a}
                  {q.startsWith("What if I need more help") && (
                    <>
                      {" "}
                      <Link to="/contact" className="text-green-brand-dark underline">
                        Get in touch here.
                      </Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 10 · Call to action */}
      <section className="relative bg-navy-brand py-24 md:py-32 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,rgba(22,160,124,0.18)_0%,transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight text-white mb-6">
            {CTA_HEADLINE} <span className="italic text-green-brand">{CTA_HEADLINE_ACCENT}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">{CTA_SUBHEAD}</p>
          <CheckoutButton />
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm">
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
      </section>

      {/* STEP 11 · Warning */}
      <section className="bg-slate-50 border-b border-slate-100 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-8">
            <AlertTriangle className="w-6 h-6 text-slate-700" strokeWidth={1.75} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-8">
            {WARNING_HEADLINE} <span className="italic text-green-brand">{WARNING_HEADLINE_ACCENT}</span>
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-700 font-normal leading-relaxed mb-8">
            {WARNING_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-serif text-slate-900 leading-snug">{WARNING_CLOSER}</p>
        </div>
      </section>

      {/* STEP 12 · P.S. */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-2xl mx-auto border-l-4 border-green-brand pl-7 md:pl-9">
          <p className="font-serif italic text-xl md:text-2xl text-slate-900 leading-relaxed mb-3">P.S.</p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">{PS_BODY}</p>
          <CheckoutButton size="md" />
        </div>
      </section>
    </div>
  );
}
