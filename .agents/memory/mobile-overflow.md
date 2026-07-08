---
name: Mobile horizontal overflow guardrail
description: Why agile-vision has a global overflow-x hidden rule and how to keep adding decorative blobs safely.
---

Decorative background elements (radial gradient "blobs") are frequently absolutely positioned and centered with `left-1/2 -translate-x-1/2` at fixed pixel widths (e.g. `w-[600px]`). On narrow viewports (360-375px) these extend far past the edges of the screen. If the containing section lacks `overflow-hidden`, this causes horizontal page scroll/jitter on mobile.

**Fix applied:** `overflow-x: hidden` on both `html` and `body` in `artifacts/agile-vision/src/index.css` (`@layer base`), as a global safety net, rather than auditing/adding `overflow-hidden` to every section individually.

**Why:** Cheaper and more robust than hunting every current and future decorative element; `overflow-x-hidden` on body doesn't break `position: sticky` (only affects x-axis, y-axis stays visible/auto) or `position: fixed` elements.

**How to apply:** When adding new full-bleed decorative sections with large fixed-width absolute blobs, prefer wrapping them in a section with `overflow-hidden` where practical, but the global rule is the backstop — don't assume you need to chase down every instance.
