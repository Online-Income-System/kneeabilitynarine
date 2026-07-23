import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { GOOGLE, YELP, REVIEWS, type Review } from "../data/reviews";

function Stars({ size = "w-4 h-4" }: { size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} fill-star-gold text-star-gold`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  // The 4-colour Google "G" mark.
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.87z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A12 12 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

export function YelpMark({ className = "w-4 h-4" }: { className?: string }) {
  // Simplified Yelp burst mark in Yelp red.
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <path
        fill="#D32323"
        d="M11.44 1.9c.4-.75 1.53-.6 1.72.23l1.6 6.83a.94.94 0 0 1-1.42 1.02L7.5 6.4a.94.94 0 0 1-.15-1.47l4.1-3.02zm7.36 6.05c.83-.24 1.53.66 1.09 1.4l-1.72 2.9a.94.94 0 0 1-1.66-.13l-1.1-3.13a.94.94 0 0 1 1.13-1.23l2.26.19zm1.03 6.9c.86.1 1.13 1.2.42 1.68l-2.86 1.94a.94.94 0 0 1-1.45-.83l.14-3.32a.94.94 0 0 1 1.4-.78l2.35 1.3zm-6.02 3.42a.94.94 0 0 1 1.63.5l.42 3.42c.1.86-.9 1.4-1.56.85l-2.63-2.2a.94.94 0 0 1 .16-1.55l1.98-1.02zm-3.85-2.2a.94.94 0 0 1 .84 1.4l-1.7 3.02c-.43.76-1.57.6-1.76-.25l-.76-3.36a.94.94 0 0 1 1.06-1.14l2.32.33z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <Stars />
        {review.source === "google" ? <GoogleG /> : <YelpMark />}
      </div>
      <p className="text-sm font-semibold text-navy-brand mb-2 leading-snug">
        {review.outcome}
      </p>
      <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-4">
        {review.text}
      </p>
      <p className="text-xs text-slate-500 mt-auto">{review.author}</p>
    </div>
  );
}

export default function Reviews() {
  const featured = REVIEWS.filter((r) => r.featured);
  return (
    <section className="py-10 border-y border-slate-100 bg-white overflow-hidden">
      {/* Badge row — real numbers only. Yelp count appears once we have it. */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
        <a
          href={GOOGLE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <GoogleG />
          <span className="text-sm font-medium text-slate-700">
            {GOOGLE.rating.toFixed(1)} on Google
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-sm">{GOOGLE.reviewCount} five-star reviews</span>
        </a>
        <a
          href={YELP.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <YelpMark />
          <span className="text-sm font-medium text-slate-700">
            {YELP.rating ? `${YELP.rating.toFixed(1)} on Yelp` : "5-star reviews on Yelp"}
          </span>
          {YELP.reviewCount && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-sm">{YELP.reviewCount} reviews</span>
            </>
          )}
        </a>
      </div>

      {/* Moving banner */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-5 pr-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 55, ease: "linear" },
          }}
        >
          {[...Array(2)].map((_, copy) => (
            <React.Fragment key={copy}>
              {featured.map((r, i) => (
                <ReviewCard key={`${copy}-${i}`} review={r} />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
