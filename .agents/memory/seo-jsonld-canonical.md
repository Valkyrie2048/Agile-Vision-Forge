---
name: SEO canonical/JSON-LD pattern
description: How canonical URLs and structured data are injected client-side in the Vite SPA
---

`use-page-meta.ts` (`artifacts/agile-vision/src/hooks`) sets `<link rel="canonical">` and an `application/ld+json` script tag per page via `usePageMeta({ url, jsonLd })`, cleaning both up on unmount back to site defaults.

**Why:** this is a client-rendered Vite SPA with no SSR, so `index.html` only has static defaults (home page canonical + Organization JSON-LD); per-page values must be set in JS on mount for search engines that execute JS, and there was previously no canonical tag mechanism at all.

**How to apply:** any new page component that wants a distinct canonical URL or structured-data type (e.g. Product, FAQPage) should pass `url` and `jsonLd` into `usePageMeta`, not hand-roll its own `document.head` manipulation.

Also: `public/sitemap.xml` currently lists relative paths (`<loc>/</loc>`) rather than absolute URLs, since no fixed production domain was known at write time — this is spec-non-compliant and should be revisited once a permanent custom domain is set (fill in absolute `<loc>` values then).
