import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Check,
  ArrowRight,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import Seo from "../components/Seo";
import { graph, localBusinessSchema, personSchema } from "../lib/schema";

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
  "Done-for-you grocery lists and meal plans, so you still eat what you love",
];

const PREMIUM = [
  {
    name: "In-Person",
    tag: "Limited",
    tagline: "One-on-one, in her Burbank, CA gym.",
    desc: "Hands-on coaching every session, adjusted in real time. The most direct access to Narine, and the most limited by design.",
    features: [
      "Sessions in her Burbank, CA gym, built around your schedule",
      "Real-time form correction",
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

/* ─────────────────────────────────────────────────────────────────────────
   WORKSHOPS, SEMINARS & GROUP PROGRAMS — added 2026-08-23 at Narine's
   request. She asked for "another webpage"; Joshua's call was to make it a
   section on Services instead of a fifth page/nav item, so it lives here.

   Content is hers: workshops and seminars, companies booking her for
   employee wellness programs, and groups inviting her to teach rehab or
   wellness classes. The four class focuses named below (posterior chain,
   quads and hips, back, hips and groin) are the real series she ran herself
   Nov 2025 - May 2026, from her own intake answers — not invented.

   Deliberately NOT sold here: recurring group classes as a lower-priced rung.
   She retired that model on purpose ("people think they know everything from
   the classes and don't hire me 1:1"), and said she'd run larger workshops
   once or twice a year instead. This section sells being *booked* by an
   organisation, which is a different thing.

   Photos: the four group-class shots already on the site
   (narine-contact-6/7/8/9). Narine asked for "the ones that have a lot of
   people" — these are the four with a room in them; the other five are 1:1.
   Joshua approved reusing them rather than holding the page for new ones.
   Two more possible group shots in her Drive folder (P2322407, P2376809)
   are 10.4MB and 21MB, over the Drive download tool's 10MB cap, same known
   limitation as before — direct chat attachment is the workaround if she
   wants those in instead. */
const GROUP_OFFERS: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  name: string;
  desc: string;
}[] = [
  {
    icon: Building2,
    name: "Employee wellness programs",
    desc: "Bring Narine in to run a wellness program for your staff. She builds it around the work your people actually do and the injuries that come with it, so they can keep working without pain.",
  },
  {
    icon: Users,
    name: "Rehab and wellness classes",
    desc: "Invite her to teach your group. Teams, clubs, community organizations, private groups. The same ground-up method she uses one-on-one, taught to a room, so people learn how to train without adding new injuries.",
  },
  {
    icon: GraduationCap,
    name: "Workshops and seminars",
    desc: "Longer sessions built around one area of the body. She's taught the posterior chain, the quads and hips, the back, and the hips and groin, and runs larger workshops once or twice a year.",
  },
];

const GROUP_PHOTOS_TOP: string[] = [
  "/narine-contact-8.jpg",
  "/narine-contact-7.jpg",
  "/narine-contact-6.jpg",
];
const GROUP_PHOTO_WIDE = "/narine-contact-9.jpg";

/* Her five FAQs, verbatim from the doc she sent 2026-08-23. Not reworded —
   she wrote these answers herself, and they clear her own no-advice-over-
   email rule because they're general and non-prescriptive. Rendered with
   <details>/<summary> so every answer sits in the static HTML whether or not
   it's open: crawlers read it, and it works with JavaScript disabled. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "How can I get rid of knee pain?",
    a: "Knee pain can improve when you address the underlying factors contributing to it rather than simply trying to mask the pain. A personalized rehabilitation program can help improve your strength, mobility, movement, and tolerance to activity so you can gradually return to the activities you enjoy.",
  },
  {
    q: "What are the best exercises for knee pain?",
    a: "The best exercises for knee pain depend on the individual and what is contributing to their symptoms. Strengthening the muscles around the knee, hips, and posterior chain while improving mobility and gradually increasing your knee's ability to handle load can be an important part of rehabilitation.",
  },
  {
    q: "Can knee pain be fixed without surgery?",
    a: "Many types of knee pain can improve with conservative treatment such as progressive strength training, mobility work, activity modification, and rehabilitation. Whether surgery is necessary depends on the specific injury or condition, so some cases should be evaluated by a qualified medical professional.",
  },
  {
    q: "Why does my knee hurt when I squat, run, or exercise?",
    a: "Knee pain during exercise can have several causes, including changes in training load, limited mobility, weakness, previous injuries, or reduced tolerance to certain movements. Rather than automatically avoiding the activity, rehabilitation can help identify what your knee needs and progressively build its strength and capacity.",
  },
  {
    q: "Can I work out with knee pain?",
    a: "Yes. The right type of exercise can be an important part of rehabilitating your knee and improving its strength and function. Completely avoiding exercise may lead to further weakness and reduced tolerance to activity, which can make it harder to recover. However, you should avoid exercises that cause pain or movements that contributed to your injury. Instead, your training should be modified and progressively structured around what your knee can tolerate so you can build strength, improve capacity, and safely return to the activities you enjoy.",
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

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Services | Knee Ability Narine"
        description="Ways to train with Narine: 1:1 online coaching with weekly support and done-for-you nutrition, plus in-person and hybrid options in Burbank, CA. Workshops, seminars and employee wellness programs available. Every plan starts with a free call."
        path="/services"
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
          <p className="text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-5">
            Knee pain is where most people start. The same ground-up method
            treats the whole chain: knee, back, hip, groin, ankle, shin
            splint, and shoulder injuries, because those joints don't work in
            isolation.
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
                who can't get to Burbank, CA but still want Narine's expertise
                and guidance.
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
            <p>Pricing depends on your program and how much support you need.</p>
            <span className="hidden sm:inline text-slate-300">·</span>
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-brand" />
              In-person in Burbank, CA. Online anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops, seminars and group programs */}
      <section
        id="workshops"
        className="scroll-mt-24 py-24 md:py-28 px-6 md:px-12 bg-slate-50 border-y border-slate-100"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              Workshops &amp; seminars
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
              She teaches groups too,{" "}
              <span className="italic text-green-brand">
                and she can come to yours.
              </span>
            </h2>
            <p className="text-lg text-slate-700 font-normal leading-relaxed">
              Narine runs workshops and seminars through the year, and she can
              be booked directly by companies and groups. If you want your
              employees moving well and staying out of pain for the long run,
              she'll build the program around your people and come and teach
              it.
            </p>
          </div>

          {/* The three ways she gets booked */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {GROUP_OFFERS.map(({ icon: Icon, name, desc }, i) => (
              <motion.div
                key={name}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-green-brand-50 border border-green-brand/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-green-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-3">
                  {name}
                </h3>
                <p className="text-slate-700 font-normal leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Group class photos — the ones with a room full of people in them.
              aspect-[2/3] rather than [3/4]: these sources are 898x1600 (0.56),
              so 2/3 trims only ~8% off each edge and keeps heads and most of
              the body in frame. Learned the hard way on the Apr 3 blog image —
              always check a crop in a real rendered screenshot, in every
              context it appears in, before shipping it.
              Below sm the row drops to 2 columns, so the third portrait is
              hidden there: 3 portraits don't tile into 2 columns without
              either an empty cell or a crop bad enough to cut someone's head. */}
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
              {GROUP_PHOTOS_TOP.map((src, i) => (
                <motion.div
                  key={src}
                  className={`relative aspect-[2/3] rounded-2xl overflow-hidden shadow-sm bg-slate-200 ${
                    i === 2 ? "hidden sm:block" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                >
                  <img
                    src={src}
                    alt="Narine teaching one of her group classes in Burbank, CA"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-sm bg-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={GROUP_PHOTO_WIDE}
                alt="Narine leading a full group class at her gym in Burbank, CA"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="mt-14 text-center">
            <p className="text-lg text-slate-700 mb-8">
              Tell her about your team or your group and what you'd want them
              to get out of it.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-green-brand/25"
            >
              Ask About Booking Narine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs — her own answers, verbatim (see FAQS above) */}
      <section id="faq" className="scroll-mt-24 py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              Common questions
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900">
              The questions she{" "}
              <span className="italic text-green-brand">gets asked most.</span>
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group py-2">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg md:text-xl font-serif text-slate-900 group-hover:text-green-brand transition-colors">
                    {q}
                  </h3>
                  <ChevronDown
                    className="w-5 h-5 shrink-0 mt-1 text-green-brand transition-transform duration-300 group-open:rotate-180"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 pr-11 text-slate-700 font-normal leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-lg text-slate-700 mb-8">
              If your question isn't here, ask her on the call.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-brand text-white text-lg font-medium hover:bg-green-brand-dark transition-all hover:scale-105 shadow-xl shadow-green-brand/25"
            >
              Book Your Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
