import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

// NOTE: her "text me" SMS CTA returns once we have her real number.

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="Knee Ability Narine home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/knee-ability-icon-green.png"
            alt=""
            className="h-11 w-auto"
          />
          <span className="whitespace-nowrap font-serif text-lg sm:text-xl tracking-tight text-slate-900">
            Knee Ability <span className="hidden min-[420px]:inline">Narine</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-slate-700 hover:text-green-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-green-brand text-white text-sm font-medium hover:bg-green-brand-dark transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile: Contact stays visible, everything else collapses behind the burger icon */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full bg-green-brand text-white text-sm font-medium hover:bg-green-brand-dark transition-colors"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-2 -mr-2 text-slate-700 hover:text-green-brand transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.75} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-slate-100"
          >
            <div className="px-4 sm:px-6 py-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 text-base font-medium text-slate-700 hover:text-green-brand transition-colors border-b border-slate-50 last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
