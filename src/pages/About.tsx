import React from "react";

// Placeholder — the About page (her origin story) is built in a later step.
export default function About() {
  return (
    <div className="min-h-screen bg-white pt-40 pb-28 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
          About Narine
        </p>
        <h1 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900">
          Her story is <span className="italic text-green-brand">coming here.</span>
        </h1>
      </div>
    </div>
  );
}
