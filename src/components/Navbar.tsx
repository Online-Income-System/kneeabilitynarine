import React from "react";
import { Link } from "react-router-dom";

// TODO: swap the text wordmark for her logo file (public/knee-ability-logo.png)
// TODO: real phone number for the sms: link (her converting "text me" feature)
export const SMS_LINK = "sms:+18180000000";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Knee Ability Narine home"
        >
          <span className="whitespace-nowrap font-serif text-lg sm:text-xl tracking-tight text-green-brand-dark font-semibold">
            Knee Ability
          </span>
          <span className="hidden min-[420px]:inline whitespace-nowrap font-serif text-lg sm:text-xl tracking-tight text-slate-900">
            Narine
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <Link
            to="/"
            className="hidden sm:block text-sm font-medium text-slate-700 hover:text-green-brand transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden sm:block text-sm font-medium text-slate-700 hover:text-green-brand transition-colors"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium text-slate-700 hover:text-green-brand transition-colors"
          >
            Services
          </Link>
          <a
            href={SMS_LINK}
            className="px-5 py-2.5 rounded-full bg-green-brand text-white text-sm font-medium hover:bg-green-brand-dark transition-colors"
          >
            Text Me
          </a>
        </nav>
      </div>
    </header>
  );
}
