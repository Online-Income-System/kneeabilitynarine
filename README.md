# kneeabilitynarine.com — Site Rebuild

Complete rebuild of Narine Ashnalikyan's (Knee Ability Narine) website.
Premium custom build, optimised for SEO + AI search (GEO).

## Pipeline

Local code → GitHub → Netlify (auto-deploy from `main`).
GoHighLevel is CRM only (forms/booking/email) — not hosting.
Launch = DNS update on the existing domain (currently Squarespace).

## Repo layout

```
site/        → the deployable site (Netlify publish dir)
  assets/    → css, js, img, video
  data/      → reviews.json (Google + Yelp reviews powering the carousel)
content/     → NOT deployed. source/ = raw material, copy/ = approved copy drafts
docs/        → SITE-PLAN.md and build decisions
netlify.toml → deploy config
```

## References

- Structure/feel: https://scienceofselling.co/
- Review carousel pattern: https://ability-training.com/ (custom carousel + Google rating badge — we add Yelp alongside Google)

See `docs/SITE-PLAN.md` for the full build plan.
