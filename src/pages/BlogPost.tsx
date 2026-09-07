import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { BLOG_POSTS } from "../data/blog";
import Seo from "../components/Seo";
import YouTubeEmbed from "../components/YouTubeEmbed";
import {
  graph,
  blogPostingSchema,
  faqPageSchema,
  extractFaqs,
  breadcrumbSchema,
  videoObjectSchema,
  localBusinessSchema,
  personSchema,
  webSiteSchema,
} from "../lib/schema";

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
    /* Lets a post body drop a video inline with:
         <YouTube id="XXXXXXXXXXX" title="..." caption="..." />
       markdown-to-jsx resolves the tag name against this override map, so
       no HTML is passed through raw and nothing else in the body changes. */
    YouTube: { component: YouTubeEmbed },
  },
};

/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────────────
   Sits directly under the headline, above the article body.

   Two reasons it earns the space. For a reader in pain scanning on a phone,
   it answers the question they arrived with before asking them to read
   1,500 words. For an AI assistant summarising the page, it is a block of
   short, self-contained, quotable sentences at the top of the document,
   which is exactly the shape of text that gets lifted into an answer.

   Rendered as a real <ul> in static HTML — no accordion, no JavaScript —
   so it is present for every crawler on first paint. */
function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside
      aria-labelledby="key-takeaways"
      className="scroll-mt-28 mb-12 rounded-2xl border border-green-brand/20 bg-green-brand/5 px-6 py-7 md:px-8 md:py-8"
    >
      <h2
        id="key-takeaways"
        className="text-green-brand text-xs font-semibold uppercase tracking-[0.25em] mb-5"
      >
        The short answer
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-lg text-slate-800 leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

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

  /* FAQs are parsed out of the post body rather than duplicated in the data
     file, so editing the article edits the structured data too. See
     extractFaqs() in src/lib/schema.ts. */
  const faqs = extractFaqs(post.body);

  const schema = graph(
    localBusinessSchema(),
    personSchema(),
    webSiteSchema(),
    blogPostingSchema(post),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    ...(faqs.length ? [faqPageSchema(faqs)] : []),
    ...(post.video ? [videoObjectSchema(post.video, post)] : []),
  );

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`${post.title} | Knee Ability Narine`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        schema={schema}
      />

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
          {post.takeaways?.length ? (
            <KeyTakeaways items={post.takeaways} />
          ) : null}

          {/* A post's headline video sits above the body. Videos placed
              mid-article use the <YouTube /> tag inside the markdown
              instead — see markdownOptions above. */}
          {post.video && (
            <YouTubeEmbed
              id={post.video.youtubeId}
              title={post.video.title}
              caption={post.video.description}
            />
          )}

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
