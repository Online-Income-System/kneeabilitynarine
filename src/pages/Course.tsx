import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Seo from "../components/Seo";
import { GoogleG } from "../components/Reviews";
import { graph, localBusinessSchema, personSchema } from "../lib/schema";
import { GOOGLE, REVIEWS } from "../data/reviews";

/* ─────────────────────────────────────────────────────────────────────────
   COURSE LANDING PAGE — makeshift page built 2026-09-14 so the $397 course
   has a real page of its own instead of relying on Pillar's checkout page
   (state unconfirmed as of the 2026-09-11 questions sent to Narine, see
   claude/narine-course-status-questions-draft-2026-09-11.md). Intended to
   be live before the 28 Sept "Where to start" email (free-course list,
   355 people) sends, and reusable for the enquiries-list reply-followups
   and the mid/late-October Fast Cash push.

   DELIBERATELY NOT CLAIMED HERE, because none of it is confirmed yet:
   - A specific guarantee or refund policy.
   - A curriculum / module list (only "the same method she uses with her
     1:1 clients" is stated anywhere she's approved, so that's all this
     page says).
   Do not add either without her explicit answer on file.

   CTA MECHANISM — links straight through to Narine's real Pillar checkout
   (the sales page + payment form she already has live), rather than trying
   to replicate payment processing on this site. Confirmed with her
   2026-09-15. A plain <a> is used instead of react-router's Link since this
   is a fully external URL, Link cannot navigate off-site. */
const COURSE_ACCESS_HREF =
  "https://pillar.io/kneeabilitynarine/checkout/0147d9c0-6798-11ee-a21d-a3e35b1bdc1d";
const COURSE_PRICE = "$397";

const FEATURED_REVIEWS = REVIEWS.filter((r) => r.featured).slice(0, 3);

const FAQS: { q: string; a: string }[] = [
  {
    q: "What exactly am I getting?",
    a: "The same method Narine uses with her 1:1 clients, packaged so you can go through it yourself, at your own pace. It's yours to keep.",
  },
  {
    q: "Is this the same as training with Narine 1:1?",
    a: "No, and she won't pretend it is. It's not the same as her watching your form every week and adjusting your program as you go. It's a lot better than waiting to see whether things sort themselves out on their own.",
  },
  {
    q: "How much does it cost?",
    a: `${COURSE_PRICE}, one time.`,
  },
  {
    q: "What if I think I need more support than a self-paced course?",
    a: "That's what the 1:1 program is for. Get in touch and Narine will help you work out which one actually fits where you're at.",
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

export default function Course() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="The Course | Knee Ability Narine"
        description="Narine's self-paced course: the same method she uses with her 1:1 clients, yours to keep, at your own pace. $397."
        path="/course"
        schema={graph(localBusinessSchema(), personSchema(), FAQ_SCHEMA)}
      />

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
            Self-paced
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            The same method,{" "}
            <span className="italic text-green-brand">on your own time.</span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
            Narine's course walks you through the same ground-up method she
            uses with the people she trains 1:1. It's yours to keep, and you
            go through it at your own pace.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={COURSE_ACCESS_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-green-brand text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-green-brand/25 hover:bg-green-brand-dark transition-colors"
            >
              Get started, {COURSE_PRICE}
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-slate-500">One time. Yours to keep.</p>
          </div>
        </div>
      </motion.section>

      {/* What it is / isn't */}
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
                What you get
              </span>
              <h2 className="text-3xl font-serif font-medium leading-tight mb-4">
                Her method, not a generic program.
              </h2>
              <p className="text-white/90 leading-relaxed">
                This is the same ground-up approach Narine uses with the
                people she trains one on one, put together so you can work
                through it yourself, whenever it suits you.
              </p>
            </div>
            <ul className="space-y-4">
              {[
                "The same method she uses with her 1:1 clients",
                "Yours to keep, no expiry",
                "Go at your own pace, no fixed schedule",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="text-white/95">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Honest framing: what it isn't */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
            What this isn't
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            It's not the same as Narine watching your form every week and
            changing your program as you go. She won't pretend it is. But
            it's a lot better than waiting to see whether things sort
            themselves out on their own. If you want that closer level of
            support, that's her 1:1 program,{" "}
            <Link to="/contact" className="text-green-brand-dark underline">
              get in touch
            </Link>{" "}
            and she'll help you work out which one actually fits.
          </p>
        </div>
      </section>

      {/* Proof: real reviews, real results from training with her */}
      <section className="px-6 md:px-12 py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
              <GoogleG className="w-4 h-4" />
              {GOOGLE.rating.toFixed(1)} · {GOOGLE.reviewCount} Google reviews
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">
              Real results from training with Narine
            </h2>
            <p className="text-slate-600 mt-2">
              The course teaches the same method behind these.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_REVIEWS.map((r) => (
              <div
                key={r.author}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {r.outcome}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  "{r.text}"
                </p>
                <p className="text-xs text-slate-500">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-slate-200 px-5 py-4"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-slate-900">
                  {q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-slate-600 leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
            Ready to start?
          </h2>
          <a
            href={COURSE_ACCESS_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-green-brand text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-green-brand/25 hover:bg-green-brand-dark transition-colors"
          >
            Get started, {COURSE_PRICE}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
