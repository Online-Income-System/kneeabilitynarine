import React from "react";
import { Head } from "vite-react-ssg";
import {
  SITE_URL,
  BUSINESS,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from "../lib/site";

/* ─────────────────────────────────────────────────────────────────────────
   ONE HEAD BLOCK FOR EVERY PAGE.

   Before this existed each page hand-rolled a <title> and a description and
   nothing else — no canonical, no Open Graph, no Twitter card. That means a
   link shared to Instagram, WhatsApp or a text message rendered as a bare
   URL with no image, and Google had no canonical signal to collapse the
   apex/www and trailing-slash variants of each URL onto one address.

   `path` must be the site-relative canonical path, e.g. "/blog/some-post".
   Pass it explicitly rather than reading the router location: during static
   generation the component renders once per route and we want the canonical
   to be unambiguous rather than inferred. */

type Props = {
  title: string;
  description: string;
  path: string;
  /** Site-relative or absolute image for the social card. */
  image?: string;
  /** "website" for pages, "article" for blog posts. */
  type?: "website" | "article";
  /** JSON-LD graph object; stringified into one script tag. */
  schema?: object;
  /** Article-only Open Graph timestamps. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Set true on pages that must never be indexed (none today). */
  noindex?: boolean;
};

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  schema,
  publishedTime,
  modifiedTime,
  noindex = false,
}: Props) {
  /* The homepage canonical keeps its trailing slash so it matches the entry
     in sitemap.xml exactly. A canonical of "…/com" and a sitemap entry of
     "…/com/" are two different URLs to a crawler, and disagreeing with your
     own sitemap is a self-inflicted wound. */
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const ogImage = absoluteUrl(image);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph — used by Facebook, Instagram, LinkedIn, WhatsApp,
          iMessage and most other link unfurlers. */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content={BUSINESS.legalPerson} />
      )}

      {/* Twitter/X. summary_large_image is the wide card. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Head>
  );
}
