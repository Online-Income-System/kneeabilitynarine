import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { GOOGLE, YELP } from "../data/reviews";

export default function Footer() {
  return (
    <footer className="bg-navy-brand text-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/knee-ability-icon-white.png"
                alt=""
                className="h-10 w-auto"
              />
              <span className="font-serif text-xl text-white">
                Knee Ability <span className="text-green-brand-50">Narine</span>
              </span>
            </div>
            <p className="text-slate-300 font-normal leading-relaxed max-w-xs">
              Get out of knee and back pain without surgery, shots, or steroids.
              1:1 rehab training in Burbank, CA and online.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-[0.2em] mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-[0.2em] mb-5">
              Get in touch
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li>Burbank / San Fernando Valley, CA</li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Narine
                </Link>
              </li>
              <li>
                <a
                  href={GOOGLE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-star-gold text-star-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  {GOOGLE.rating.toFixed(1)} on Google ({GOOGLE.reviewCount})
                </a>
              </li>
              <li>
                <a
                  href={YELP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  5-star reviews on Yelp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Knee Ability Narine. All rights reserved.</p>
          <p>1:1 rehab training · Burbank, CA &amp; online</p>
        </div>
      </div>
    </footer>
  );
}
