import React from "react";

// Placeholder — the real contact page (text/SMS CTA, GHL form or calendar) is built next.
export default function Contact() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-28 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 mb-6">
          Ready to get out of <span className="italic text-green-brand">pain?</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
          The way to reach Narine goes here: text, call, or book a free consult.
          This page is being built next.
        </p>
      </div>
    </div>
  );
}
