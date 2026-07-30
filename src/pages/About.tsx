import React from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { ArrowRight, Brain, Users } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   ABOUT PAGE — her real origin story (wiki/identity/origin-story.md +
   founder-profile.md), structure cloned from Joshua's own About.tsx
   (hero -> photo/intro -> stat blocks -> thematic sections -> CTA), but
   entirely third person throughout, per her house rule: bio/credentials
   content about Narine herself uses "she/her," never first-person "I/my"
   the way the rest of the site never uses "I/my" from her either.
   Uses a different full-body photo than the homepage (that one's the bicep-flex
   shot; this is her front-facing deadlift setup), per Joshua's request not to
   reuse the same image twice. Still uncropped, full body, per her house rule. */

// Reusable section label — icon in a soft green badge, label beside it.
function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 rounded-2xl bg-green-brand-50 border border-green-brand/10 flex items-center justify-center shadow-sm">
        <Icon className="w-7 h-7 text-green-brand" strokeWidth={1.75} />
      </div>
      <p className="text-xs font-semibold text-green-brand uppercase tracking-[0.25em]">
        {children}
      </p>
    </div>
  );
}

const ORIGIN_BODY: string[] = [
  "Tango dancing was her identity before any of this. It was stress relief, community, the thing that made her feel like herself. Then at 30, a knee injury during jiu jitsu turned into patellar tendinitis, and it hit at the same time she lost her job.",
  "No income, no training, and pain that scanned her body awake every morning before she was even out of bed. She tried chiropractors, creams, rest, and a trainer who understood fitness but not pain. It took eight months to get out of chronic pain, and a full year before she was back to training.",
  "The turning point wasn't a new treatment. It was a different question. Her ligaments and tendons weren't weak because she was broken. They were weak because they'd never been properly strengthened. She rebuilt them on purpose, slowly, chasing adaptation instead of relief. At 31 she started Judo, pain free. The year after, Muay Thai.",
  "Friends and family had been watching her rebuild and started asking for help. She got certified, took her first client within a week, and built what's now Knee Ability Narine.",
];

const STATS: { value: string; label: string; sub: string }[] = [
  {
    value: "75+",
    label: "People out of pain",
    sub: "Clients rebuilt from the ground up, in person in Burbank, CA and online anywhere.",
  },
  {
    value: "3 years",
    label: "Coaching as Knee Ability Narine",
    sub: "Certified in 2023, the same day her corporate contract ended.",
  },
];

const APPROACH_BODY: string[] = [
  "Every session runs on one rule that doesn't bend: never push through pain. If something hurts, that's information, not something to work through.",
  "It's never a cookie-cutter program. She knows when to push a client forward and when to have them regress, and when one injury leads to another, she knows how to rehab the second and third injury too, because every pain point in the body is connected.",
  "She also asks for honesty in return. The more honest a client is about what they're feeling, the faster she can adjust the plan around it, not the other way around.",
  "Clients who are scared or in pain for the first time get met at whatever pace they need, sometimes starting with nothing more than a conversation before any exercise begins.",
];
const APPROACH_CLOSER =
  "With her, you're not getting someone running a generic rehab program. You're getting an experienced coach who knows how to help people actually get out of pain safely.";

const MISSION_BODY: string[] = [
  "When she started, there weren't other women doing rehab training in her market. She built her practice to fill that gap, and many of her clients, especially women, say they feel safer and better understood working with her.",
  "She's Armenian, and she's especially motivated to serve people in her own community: strong, mobile, and still able to work and play with their grandchildren without pain.",
  "Her stated mission is to help 100 people a year get out of pain. She's already helped more than 75.",
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Narine | Knee Ability Narine</title>
        <meta
          name="description"
          content="Narine Ashnalikyan rebuilt her own body from patellar tendinitis before building Knee Ability Narine. ATG certified, Burbank, CA and online, 75+ people out of knee and back pain."
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
            About Narine
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            She rebuilt her own body first.{" "}
            <span className="italic text-green-brand">
              Then she built a method around it.
            </span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
            Pain wasn't the enemy. Low capacity was. Everything she teaches
            started with proving that on herself.
          </p>
        </div>
      </motion.section>

      {/* Photo + origin story */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto pb-16">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <motion.div
            className="relative w-full max-w-[280px] mx-auto md:mx-0 aspect-[46/75] rounded-3xl overflow-hidden shadow-xl shadow-green-brand/10 bg-gradient-to-br from-green-brand to-green-brand-dark"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white/25 font-serif text-6xl select-none">
              KA
            </span>
            <img
              src="/narine-about-photo.jpg"
              alt="Narine, founder of Knee Ability Narine, at her gym in Burbank, CA"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            {ORIGIN_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stat blocks */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto pb-24">
        <div className="grid sm:grid-cols-2 gap-6">
          {STATS.map(({ value, label, sub }) => (
            <div
              key={label}
              className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10"
            >
              <p className="text-5xl md:text-6xl font-serif text-slate-900 mb-1 leading-none">
                {value}
              </p>
              <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">
                {label}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Her approach */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <SectionLabel icon={Brain}>Her approach</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-10 leading-tight">
            Pain was never the problem.{" "}
            <span className="italic text-green-brand">Low capacity was.</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            {APPROACH_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-8 text-xl font-serif text-slate-900 leading-snug">
            {APPROACH_CLOSER}
          </p>
        </div>
      </section>

      {/* Why this work */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionLabel icon={Users}>Why this work</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-10 leading-tight">
            The first woman doing rehab training{" "}
            <span className="italic text-green-brand">in her area.</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            {MISSION_BODY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 leading-tight">
            Ready to start{" "}
            <span className="italic text-green-brand">your own rebuild?</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-green-brand/25"
          >
            Book Your Free Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
