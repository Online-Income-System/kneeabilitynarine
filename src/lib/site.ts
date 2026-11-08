/* ─────────────────────────────────────────────────────────────────────────
   SITE-WIDE CONSTANTS — single source of truth for anything that needs the
   canonical origin, the business's name/address/phone (NAP), or its profile
   URLs. Used by src/lib/schema.ts, src/components/Seo.tsx and the sitemap
   generator (scripts/generate-sitemap.mjs reads SITE_URL from here via a
   plain string match, so keep that line simple and on one line).

   NAP consistency matters for local SEO: the values below must match what
   is on the Google Business Profile and Yelp character for character. If a
   listing is corrected, correct it here too. */

export const SITE_URL = "https://kneeabilitynarine.com";

export const BUSINESS = {
  name: "Knee Ability Narine",
  legalPerson: "Narine Ashnalikyan",
  /* Display phone and the tel:/sms: form. Kept in E.164 for schema. */
  telephone: "+1-818-351-6191",
  /* No street address is published anywhere (she trains out of a gym rather
     than a clinic she owns), so the PostalAddress below is deliberately
     locality-level only. Do NOT invent a street address to "complete" the
     schema — a wrong address is worse than a partial one, and Google will
     cross-check it against the Business Profile. */
  addressLocality: "Burbank",
  addressRegion: "CA",
  addressCountry: "US",
  areaServed: [
    "Burbank, CA",
    "Glendale, CA",
    "San Fernando Valley, CA",
    "Los Angeles, CA",
  ],
  /* Online coaching means she is not geographically bound. */
  servesOnline: true,
  bookingUrl: "https://calendly.com/knee-ability-narine/30min",
} as const;

/* Profiles that should appear in `sameAs`. Every URL here is a signal that
   ties the website, the Google Business Profile and the review sites to one
   entity, which is what lets an AI assistant answer "who is Narine
   Ashnalikyan" without guessing.

   TODO (Joshua): add her YouTube channel URL and Instagram profile URL once
   confirmed. Both are missing and both are strong `sameAs` signals. */
export const PROFILES: string[] = [
  "https://maps.app.goo.gl/zUVS28wV8JxydBJK9",
  "https://www.yelp.com/biz/knee-ability-narine-san-fernando-valley",
];

/* Default social-share image. Falls back to her About portrait since there
   is no dedicated OG card yet. 1200x630 is the target if one gets made. */
export const DEFAULT_OG_IMAGE = "/narine-about-photo.jpg";

export const DEFAULT_TITLE =
  "Knee Ability Narine | Get Out of Knee & Back Pain Without Surgery, Shots, or Steroids";

export const DEFAULT_DESCRIPTION =
  "1:1 rehab training in Burbank, CA and online. Narine has helped 55+ people get out of knee and back pain without surgery, shots, or steroids. 5.0 stars on Google.";

/** Absolute URL for a site-relative path. Schema and OG tags both require
 *  absolute URLs; relative ones are silently ignored by most consumers. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
