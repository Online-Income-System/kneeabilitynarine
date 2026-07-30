import React from "react";
import { Link, useParams } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { BLOG_POSTS } from "../data/blog";

/* ─────────────────────────────────────────────────────────────────────────
   INDIVIDUAL BLOG POST TEMPLATE — one static page generated per slug in
   BLOG_POSTS (see src/App.tsx getStaticPaths and src/data/blog.ts for the
   migration notes). Body is markdown rendered via markdown-to-jsx, with
   overrides below so headings/lists/paragraphs match the rest of the
   site's type system instead of markdown-to-jsx's browser defaults. */

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// NOTE: {...props} must come BEFORE the className override in each of
// these, not after — markdown-to-jsx passes its own `className` key (even
// when empty) through props, and spreading it last silently wipes out
// whatever className we set. Caught this by diffing the built HTML: every
// heading was rendering with no class attribute at all.
const markdownOptions = {
  overrides: {
    h3: {
      component: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
          {...props}
          className="text-2xl md:text-3xl font-serif text-slate-900 mt-12 mb-5 leading-snug"
        />
      ),
    },
    p: {
      component: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="text-lg text-slate-700 leading-relaxed mb-6" />
      ),
    },
    ul: {
      component: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul
          {...props}
          className="list-disc pl-6 space-y-2 text-lg text-slate-700 leading-relaxed mb-6"
        />
      ),
    },
    li: {
      component: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li {...props} className="pl-1" />
      ),
    },
    em: {
      component: (props: React.HTMLAttributes<HTMLElement>) => (
        <em {...props} className="text-slate-600" />
      ),
    },
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-6 text-center">
        <p className="text-xl text-slate-700">
          That post couldn't be found.{" "}
          <Link to="/blog" className="text-green-brand underline">
            Back to the blog
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{post.title} | Knee Ability Narine</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      {/* Hero */}
      <motion.section
        className="relative pt-40 pb-12 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_10%,rgba(22,160,124,0.08)_0%,transparent_100%)]" />
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-green-brand transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to the blog
          </Link>
          <p className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            {formatDate(post.date)}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium leading-[1.15] text-slate-900">
            {post.title}
          </h1>
        </div>
      </motion.section>

      {/* Featured image */}
      <section className="px-6 md:px-12 mb-12 md:mb-16">
        <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden shadow-xl shadow-green-brand/10 bg-slate-100 aspect-[16/10]">
          <img
            src={post.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <Markdown options={markdownOptions}>{post.body}</Markdown>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 md:px-12 text-center bg-slate-50 border-t border-slate-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 leading-tight">
            Ready to start{" "}
            <span className="italic text-green-brand">your own recovery?</span>
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
