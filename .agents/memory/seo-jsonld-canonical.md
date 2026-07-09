---
name: SEO canonical/JSON-LD pattern
description: How canonical URLs and structured data are injected client-side in the Vite SPA
---

`use-page-meta.ts` (`artifacts/agile-vision/src/hooks`) sets `<link rel="canonical">` and an `application/ld+json` script tag per page via `usePageMeta({ url, jsonLd })`, cleaning both up on unmount back to site defaults. A separate `useRouteCanonical()` hook (wired once in `App.tsx`, keyed off wouter's location) guarantees every route gets a correct absolute canonical even if its page component never calls `usePageMeta` — don't assume canonical coverage requires touching every page file.

**Why:** this is a client-rendered Vite SPA with no SSR, so `index.html` only has static defaults; per-page values must be set in JS after mount. Relying only on individual pages opting into `usePageMeta` left several routes (home, contact, get-started, simulator, blog list) with no real canonical — the route-level hook closes that gap for free on future new pages too.

**How to apply:** any new page wanting a distinct OG title/description/structured-data type should still use `usePageMeta`; canonical correctness alone is already covered globally.

`public/sitemap.xml` and `robots.txt` are static files that must list absolute URLs against the site's real production domain, not the Replit dev/preview host — they are not regenerated at request time, so update them manually if the production domain changes.

`absUrl()` resolves against a fixed production origin rather than `window.location.origin`/`.href`, and canonical composition always runs a path through `absUrl()`. Never pass `window.location.href` as the `url` into `usePageMeta` (it bakes in whatever host — dev/preview/prod — the page happened to load from); pass a path-relative `url` (e.g. `/blog/${slug}`) or omit it so it falls back to the current pathname.
