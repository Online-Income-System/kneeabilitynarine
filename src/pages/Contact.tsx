import React, { useEffect, useRef } from "react";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { CalendarCheck, MessageCircle, Search, ClipboardList, Star } from "lucide-react";
import { GOOGLE } from "../data/reviews";

/* ─────────────────────────────────────────────────────────────────────────
   CONTACT PAGE — the entry point for the free call, sourced from the real
   flow in wiki/offers/offer-architecture.md: free call -> body assessment
   -> personalised 1:1 plan. No prices (hers are in flux, same call made on
   Home/Services). Zero I/me/my.

   Booking, replacing the old contact form (per Narine's direct instruction):
   two cards side by side — a live Calendly embed, and a "text Narine
   directly" card. The Calendly link is hers (calendly.com/knee-ability-narine
   /30min). Her phone number (818-351-6191) is sourced from two independent
   places in her own material: the CTA in her original Squarespace site copy
   ("Text me the word 'consult' to schedule..." -> sms:8183516191) and the
   GoHighLevel setup note in wiki/strategy/open-questions.md referencing the
   same number as the one to connect. Not fabricated, not guessed.

   The old Netlify Forms wiring (data-netlify, fetch() submission) is gone
   along with the form itself — OPEN ITEM for Joshua from that build is now
   moot, nothing left to turn on in the Netlify dashboard for this page.

   Photo gallery below: per Joshua's direct instruction, this must be about
   her clients and Narine working with them, not Narine solo — so the solo
   shots that filled out the earlier version of this collage are gone. He
   named 9 specific files from her "Pics for website" Drive folder that
   show her with clients: P1965856.JPEG, P1976606.JPG, P2355455.JPG,
   P2365990.JPG, P2366084.JPG, P2366255.JPG, P2366397.JPG, P2366632.JPG,
   PFF01527.JPG. Only the first two (narine-contact-1 and narine-contact-6
   below) are downloadable — the other 7 are all 14-19MB, freshly retested
   individually against the live Drive tool right when this was built, and
   every one still fails with the same "over limit of 10 MB" error. There is
   no workaround available from here (no raw Drive-API access, just this
   MCP tool). Until compressed copies of those 7 are supplied directly
   (attaching them to the chat bypasses this cap entirely, since it's a
   limit of the Drive download tool specifically, not of image size in
   general), this section only has the 2 real client photos to show —
   laid out big and deliberate rather than padded out with solo shots. */
const CALENDLY_URL = "https://calendly.com/knee-ability-narine/30min";
const PHONE_DISPLAY = "(818) 351-6191";
const PHONE_SMS = "sms:8183516191";

const GALLERY_PHOTOS: { src: string }[] = [
  { src: "/narine-contact-1.jpg" },
  { src: "/narine-contact-6.jpg" },
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

// Loads Calendly's widget script once, then uses the documented
// initInlineWidget API to render into this component's own container.
// Using the imperative API (rather than dropping a raw <script> tag in
// JSX, which React won't execute) means this also re-initializes cleanly
// if a visitor navigates away from /contact and back in this SPA.
function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "calendly-widget-script";
    let cancelled = false;

    function init() {
      if (cancelled || !containerRef.current) return;
      const Calendly = (window as any).Calendly;
      if (!Calendly) return;
      containerRef.current.innerHTML = "";
      Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: containerRef.current,
      });
    }

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).Calendly) {
        init();
      } else {
        existing.addEventListener("load", init);
      }
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.addEventListener("load", init);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      existing?.removeEventListener("load", init);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      style={{ minWidth: "280px", height: "700px" }}
    />
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Book Your Free Call | Knee Ability Narine</title>
        <meta
          name="description"
          content="Book a free call with Narine: a real conversation about your pain, a body assessment, and a personalised plan to get you moving again. Burbank, CA and online."
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
        <div className="max-w-3xl mx-auto text-center mb-14">
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

        {/* Book directly — Calendly embed + text-Narine, side by side */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-3xl border border-slate-100 shadow-2xl shadow-green-brand/10 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-green-brand-50 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-6 h-6 text-green-brand" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-serif text-slate-900">
                Pick a time that works
              </h2>
            </div>
            <CalendlyEmbed />
          </div>

          <div className="rounded-3xl bg-green-brand p-8 md:p-10 text-white flex flex-col justify-center">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-serif mb-3">Prefer to text?</h2>
            <p className="text-white/85 font-normal leading-relaxed mb-8">
              Reach Narine directly, no form to fill out. Send a text and
              she'll get back to you.
            </p>
            <a
              href={PHONE_SMS}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-green-brand-dark text-lg font-medium hover:bg-green-brand-50 transition-all hover:scale-[1.02]"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
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
              Narine, working with her clients.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {GALLERY_PHOTOS.map(({ src }, i) => (
              <motion.div
                key={src}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg shadow-slate-900/5 bg-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <img
                  src={src}
                  alt="Narine coaching a client at her gym in Burbank, CA"
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
