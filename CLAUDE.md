# Instructions for Claude: Narine's website (kneeabilitynarine.com)

This is the website for **Knee Ability Narine**, Narine Ashnalikyan's rehab and strength coaching business in Burbank, California (in person and online). Narine owns this site and makes changes to it by asking you in plain words.

## Who you're working with

Narine is a rehab coach, not a tech person. She will describe what she wants the way she'd explain an exercise to a client.

- Talk to her in plain, friendly words. No code, file names or tech words unless she asks.
- If a request is unclear, ask one short question before you change anything.
- When you finish, tell her in one or two sentences what you changed and what to check in the preview.
- If something goes wrong, explain it simply and say what you'll do to fix it.

## How every change goes live (always follow this)

1. Make the change on a new branch. **Never push to `main` directly.**
2. Run `npm run build` and make sure it finishes with no errors before you hand the change back. If it fails, fix it first.
3. Narine clicks **Create PR**. Netlify then builds a **Deploy Preview** link on the pull request, and she checks the change there.
4. She presses **Merge** when she's happy. The live site updates a few minutes later.

Change only what she asked for. Don't tidy up, rename or "improve" anything else.

## Writing rules for anything on the site

- **American spelling** (color, paralyzed, skeptical). Narine asked for this.
- **First person.** On the site, Narine speaks as "I" and "my" (About, Home, Course and anywhere else it's about her). Testimonials, image descriptions (alt text) and the SEO/schema descriptions for Google stay in third person.
- **Her words, not yours.** Blog posts and page copy are built from her own videos, voice notes and writing. Keep as much of her wording as possible. Never invent quotes, stories, client results or facts for her. If something is missing, ask her.
- **Her voice:** warm and conversational, like she talks to her clients. Short sentences, but not cold. Cut salesy padding, keep the human parts.
- Speak to the reader as **"you"**.
- **Literal over figurative**, especially about pain and injury.
- No clever wordplay or parallel lines (like "same sessions, same me").
- Never use the words **"pressure"** or **"obligation"**.
- No hard, pushy sales language. She doesn't like aggressive marketing.
- **No prescriptions.** Don't tell readers exactly what exercises to do or how often. Her beliefs and her clients' stories are fine. Her view: no pain is normal at any age, and most of it can be rehabbed.
- Don't put her 1:1 coaching price anywhere on the site.

## Where things live

| What | Where |
| --- | --- |
| Pages | `src/pages/` (Home, About, Services, Contact, Blog, BlogPost, Course) |
| Blog posts | `src/data/blog.ts`, in the `BLOG_POSTS` list |
| Google and Yelp reviews | `src/data/reviews.ts` |
| Business name, phone, area, booking link | `src/lib/site.ts` |
| SEO data (schema) | `src/lib/schema.ts` and `src/components/Seo.tsx` |
| Images | `public/` |
| Newsletter sign-up (to Kit) | `src/components/NewsletterSignup.tsx` and `netlify/functions/newsletter-signup.mts` |
| Build and deploy settings | `netlify.toml` (build `npm run build`, publish `dist`) |

## Adding a blog post

1. Add a new entry at the **top** of `BLOG_POSTS` in `src/data/blog.ts` (newest first). Copy the shape of the newest post.
2. Fill in: `slug` (short, lowercase, words joined with hyphens), `title`, `date` (YYYY-MM-DD), `excerpt` (one or two sentences), `image`, and `body` (markdown).
3. Always fill in `topics` (3 to 5 real subjects, e.g. "Meniscus tear") and `takeaways` (2 to 5 plain answers, each a complete sentence that makes sense on its own). These help Google and AI search understand the post. Don't keyword-stuff.
4. If the post is built from one of her videos, add `video` (YouTube: the 11-character ID) or `instagram` (the clean post URL, no `?igsh=` tracking bit).
5. If the post has questions and answers, put them under a heading written exactly `### Frequently Asked Questions`. The site turns these into FAQ data for Google automatically.
6. The header image goes in `public/` as `blog-<slug>.jpg`. The blog list shows images at 4:3 and the post page at 16:10, so check her head and face aren't cut off in both. If a photo must be shown whole, set `imageAspect`. If the list crop looks wrong, add a separate 4:3 `thumbnail`.
7. To let Narine see a post on the real site before it's public, set `unlisted: true`. Remove it when she approves.
8. Only set `updated` when the content of an old post really changes.

The sitemap is made automatically on every build. You don't need to edit it.

## Adding a testimonial video to the home page

Video testimonials are in the `VIDEO_TESTIMONIALS` list in `src/pages/Home.tsx`. Each one has a `name`, an `outcome` line and the Instagram post `url`. The order in the list is the order on the page. Only use names and outcome lines Narine gives you or that are in her own caption. Never invent a result.

## The course page (/course)

- It's a standalone sales page for the **Back to Sports Knee Rehab Program**. It's **unlisted on purpose**: no site menu, marked noindex, and left out of the sitemap. People reach it by link only. Don't add it to the menu or sitemap unless Narine asks.
- The buy buttons go to her checkout link (`CHECKOUT_HREF` in `src/pages/Course.tsx`, Pillar for now). If she sends a new checkout link, change it there.
- Course facts on the page come from her own course page. Don't add claims she hasn't confirmed.

## Things to leave alone unless she asks

- **`src/lib/site.ts` business details** must match her Google Business Profile and Yelp exactly. Don't change them unless she says her listing changed. Never add a street address: she doesn't publish one.
- **The newsletter function** (`netlify/functions/newsletter-signup.mts`) sends sign-ups to her Kit form "Website sign-up" (form ID in the file). No keys or Netlify settings needed. If she wants sign-ups to go to a different Kit form, change the form ID there.
- Don't remove or rename the SEO fields, schema or FAQ heading format.
- Don't add tracking, pop-ups or new services without asking her.

## If she asks how to do something outside the website

She uses Calendly for bookings and Pillar for her course. Those aren't in this site's files. Explain how to do it there in simple steps.
