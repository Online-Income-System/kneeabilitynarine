# Knee Ability Narine — Website Build Plan

Client: Narine Ashnalikyan · Knee Ability Narine · kneeabilitynarine.com
Engagement: 90-day done-for-you build (contract signed July 2, 2026)
Status: **Infrastructure laid — nothing built yet.** Working step-by-step with Joshua.

## 1. Context

- Current site: Squarespace ("Unleash Your Best Self", green/white, Home / About / Services / Blog / Contact). Solid social proof already (13+ written testimonials on-page) but generic template feel.
- New site: complete custom rebuild, launched on the same domain via DNS update. Premium standard, optimised for SEO and AI search (GEO).
- Pipeline: **local code → GitHub → Netlify** (auto-deploy from `main`; deploys are batched to conserve Netlify build credits). GoHighLevel is CRM only — booking, forms, email sequences.
- Stack (2026-07-23): **Vite + React + Tailwind 4 + vite-react-ssg + motion — a direct clone of the Mason/SOS site architecture** at Joshua's direction. Pages in `src/pages/`, components in `src/components/`, reviews data in `src/data/reviews.ts`, static build to `dist/`.
- Narine liked the look of scienceofselling.co (structure, premium single-column feel) and specifically the **Google review carousel** on ability-training.com (Mason's site — same ATG world, so the pattern fits her market). Hers gets **Google + Yelp** side by side.

## 2. Design direction

- Structural model: scienceofselling.co — single-column, generous whitespace, modular sections, hero → proof → problem → method → testimonials → bio → CTA rhythm.
- Palette (corrected 2026-07-23): **her LIGHTER green, not Mason's dark teal** ("His is, like, a darker teal" / "I prefer the lighter green that I gave you"). Current: #16a07c, to be matched exactly to her light-green logo when the file lands. White base, navy only as her trust pairing, gold reserved for review stars.
- Review carousel model: ability-training.com — custom-implemented looping carousel (no third-party widget), Google rating badge (stars + count) anchored in the hero. Narine's version: dual badges (Google + Yelp), one carousel mixing both sources with a source icon per card.

## 3. Site map (v1 launch)

Single strong homepage + minimal supporting pages, blog/article engine added in Phase 4 of the 90 days.

1. `/` — the sales page (sections 01–10, see `site/index.html` shell)
2. `/about` — long-form origin story (rich material: two origin-story docs in Drive)
3. `/reviews` (optional) — full wall of proof, all video + written testimonials
4. Articles hub — later, powers the content engine (Phase 4)
5. `robots.txt`, `sitemap.xml`, 404 — pre-launch

Homepage structure (2026-07-23): **Joshua's 12-Step Sales Letter Template** — 1 get attention (hero) → 2 identify the problem → 3 provide the solution (Ground-Up Method) → 4 credentials (Meet Narine) → 5 benefits → 6 social proof (reviews + video testimonials; carousel also sits under the hero as an early trust strip) → 7 the offer (free consult) → 8 real scarcity (capacity) → 9 her verbatim guarantee → 10 CTA (text me) → 11 warning (cost of waiting) → 12 P.S. close. Full map lives as comments in `src/pages/Home.tsx`.

## 4. Reviews infrastructure (Google + Yelp)

- **Approach: curated JSON, custom carousel** — same as Mason's (his is custom-built, not an embed). No paid APIs, no third-party widget branding, full design control, zero external JS weight.
- `src/data/reviews.ts` holds both sources: overall rating + count per platform, plus verbatim reviews with outcome labels.
- `src/components/Reviews.tsx` renders the badge row + auto-scrolling mixed-source carousel (adapted from Mason's GoogleReviews component).
- Refresh workflow: when a new review lands, add it to the JSON and push — Netlify redeploys. (Fits the contract's "new testimonial goes up same day".)
- Source links (from Narine's docs):
  - Yelp: https://www.yelp.com/biz/knee-ability-narine-san-fernando-valley
  - Google: have a search-results link; need her canonical Google Business Profile review link (grab from GBP dashboard or share-review shortlink).
- SEO note: mark up reviews with `AggregateRating`/`Review` schema **only** alongside LocalBusiness data, and keep it consistent with what's publicly verifiable.

## 5. SEO / GEO infrastructure

- Semantic HTML, one `<h1>`, descriptive section headings.
- Schema.org JSON-LD: `LocalBusiness` (San Fernando Valley) + `Person` (Narine, ATG-certified) + `Review`/`AggregateRating` + `FAQPage` later.
- Meta/OG/Twitter cards, canonical tags, `sitemap.xml`, `robots.txt`.
- GEO: clear entity statements ("Narine Ashnalikyan is…"), question-shaped headings, quotable answer paragraphs — so ChatGPT/Google AI can lift clean answers.
- Performance: static HTML, no framework, compressed images (WebP), lazy-loaded video posters — aim for green Core Web Vitals out of the box.

## 6. Content inventory

**Google Drive — "Knee Ability Narine"** (inventoried 2026-07-23):

- Brand Assets: Knee Ability Logo.png, White Logo.png, "Pics for website" folder (Narine's uploads)
- Docs & Resources: Origin Story (Coach), Origin Story (Knee Rehab), Salescall Slide Deck.pdf, VSL link doc, current-site link doc
- Testimonials & Proof: 7 client videos (John · knee surgery→hiking · no back pain in 5 mo · rehabbed & avoided surgery · knee pain→dancing · wrestler 3 injuries · boston), John 13-yr case study docx, testimonial/review links docx (Google, Yelp, IG highlights + 8 named IG video testimonials with outcome one-liners)
- Transcripts: YouTube links doc (group class + online course videos)

**Local device — Narine's Master folder: ⚠ BLOCKED.** Access request was declined/failed; need Joshua to either share the exact path or connect it via Add Folder (select the Master folder itself in the picker, don't double-click into it).

**Brand Wiki: not built yet** — per contract this precedes final copy. Site copy should draw from it once it exists.

## 7. Build phases (step-by-step, together)

1. ✅ Infrastructure: repo scaffold on the Mason-site stack, GitHub repo live, Netlify connected, reviews data, this plan
1b. ✅ Homepage hero + navbar + dual review carousel + footer (v2, committed; deploy batched)
2. Get Master folder access → full content inventory → build Brand Wiki
3. Push repo to GitHub, connect Netlify (deploy previews on a netlify.app subdomain — Squarespace stays live until cutover)
4. Design system: css variables (her palette), type scale, buttons, section shells
5. Populate reviews.json from live Google + Yelp; build badges + carousel
6. Section-by-section build with copy (hero first), Joshua approves each
7. Supporting pages, schema, sitemap; GHL booking/form embeds
8. QA (mobile, speed, SEO audit) → DNS cutover from Squarespace → launch email campaign

## 8. Open decisions

- Light vs. dark treatment of her green/white brand
- www vs. apex as canonical (netlify.toml currently forces www — flip if she prefers apex)
- Whether v1 ships `/about` + `/reviews` or homepage-only
- GHL booking: embedded calendar vs. form → email sequence
