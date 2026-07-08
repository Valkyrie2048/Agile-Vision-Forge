---
name: Mobile horizontal overflow guardrail
description: Why agile-vision has a global overflow-x hidden rule and how to keep adding decorative blobs safely.
---

Decorative background elements (radial gradient "blobs") are frequently absolutely positioned and centered with `left-1/2 -translate-x-1/2` at fixed pixel widths (e.g. `w-[600px]`). On narrow viewports (360-375px) these extend far past the edges of the screen. If the containing section lacks `overflow-hidden`, this causes horizontal page scroll/jitter on mobile.

**Fix applied:** `overflow-x: hidden` on `html` only (in `artifacts/agile-vision/src/index.css`, `@layer base`), as a global safety net, rather than auditing/adding `overflow-hidden` to every section individually.

**Why:** Cheaper and more robust than hunting every current and future decorative element. IMPORTANT CORRECTION: do NOT also set `overflow-x: hidden` on `body`. Per the CSS overflow spec, if one axis is non-`visible` and the other is left `visible`, the `visible` one computes to `auto` — so `body { overflow-x: hidden }` (with `overflow-y` untouched) silently turns `body` into its own independent scroll container, which it normally never is. This broke `position: sticky` elements and scroll-triggered (`whileInView`) animations on real mobile browsers in production (reported as "UI elements not loading"), even though it looked fine in dev/preview screenshots. `html` alone is safe since the root element is already the de-facto scrolling element.

**How to apply:** When adding new full-bleed decorative sections with large fixed-width absolute blobs, prefer wrapping them in a section with `overflow-hidden` where practical, but the global `html`-only rule is the backstop. Never duplicate `overflow-x: hidden` onto `body` as well.
