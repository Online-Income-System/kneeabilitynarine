import React from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";

/* ─────────────────────────────────────────────────────────────────────────
   BLOG LISTING — see src/data/blog.ts for the full migration notes (which
   9 posts, why one was left out, where the images came from). No content
   pillars/categories yet, per Joshua: that's a v2 decision once the first
   version of the new site is live. Just a clean, newest-first grid for now. */

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blog() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Blog | Knee Ability Narine</title>
        <meta
          name="description"
          content="Real, research-backed guidance on knee pain, injury recovery, and training smarter from Narine Ashnalikyan, ATG-certified rehab coach in Burbank, CA."
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
            The blog
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-slate-900 mb-6">
            Real answers,{" "}
            <span className="italic text-green-brand">not guesswork.</span>
          </h1>
          <p className="text-xl text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
            Injury recovery, mobility, and training smarter, straight from her
            own coaching practice.
          </p>
        </div>
      </motion.section>

      {/* Post grid */}
      <section className="px-6 md:px-12 pb-24 md:pb-28">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (i % 6) * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-5 shadow-sm">
                  <img
                    src={post.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <p className="text-xs font-semibold text-green-brand uppercase tracking-[0.2em] mb-3">
                  {formatDate(post.date)}
                </p>
                <h2 className="text-xl font-serif text-slate-900 mb-3 leading-snug group-hover:text-green-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-brand">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 md:px-12 text-center bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 leading-tight">
            Ready to put this{" "}
            <span className="italic text-green-brand">into practice?</span>
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
