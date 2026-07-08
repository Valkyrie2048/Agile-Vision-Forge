---
name: Mobile demo/effect adaptations
description: Which decorative/interactive demo components were adapted or disabled for mobile, and why.
---

Agile Vision's home page has several heavy or hover-dependent visual components. Policy: adapt components with real functional content for touch, but fully disable purely decorative/ambient effects on mobile rather than trying to make them "work" there.

**Disabled on mobile (via `useIsMobile()` from `src/hooks/use-mobile.tsx`, 768px breakpoint):**
- `ParticleField` (`src/components/particle-field.tsx`) — decorative mouse-repelled background canvas; no mouse on touch, and a permanent `requestAnimationFrame` loop is a real perf/battery cost on phones. Not rendered on mobile in `App.tsx`.
- `WarpDrive` (`src/components/warp-drive.tsx`) — WebGL tap/click hero effect; WebGL context creation/perf is the least reliable tech across real-world mobile browsers (root cause class of a prior "mobile broken" production bug). `fireWarp` in `App.tsx` early-returns on mobile so the trigger never fires; the component itself is already a no-op (`return null`) when untriggered, so no extra unmount logic was needed.

**Adapted (not disabled) on mobile:**
- `PhoneFrame` / `BrowserFrame` wrappers in `src/components/demo-previews.tsx` (used by `DemoPreview` on the home page project-type showcase) — on mobile they skip the miniature device chrome (fake phone bezel / fake browser toolbar) and render the demo content directly in a plain rounded card. Rationale: a phone-frame-inside-a-phone-screen wastes vertical space and shrinks tap targets; the demo content itself (chat, dashboards, etc.) is all click/tap-driven and works fine on touch.
- `AINetworkGraph` (`src/components/ai-network-graph.tsx`) — already had an `isMobile()` check that disables hover-only interactions (node freeze/glow, auto-tour) on mobile; left as ambient background animation there since it wasn't reporting as broken and the auto-playing tour feature is fully disabled in code anyway (dead `if (true) return` guard), not something to build touch parity for.

**Why this split:** functional demos (chat, dashboards, sliders) already work on touch and just needed the chrome/wrapper adapted; ambient/decorative effects (particles, WebGL warp) add no information and are the highest-risk, lowest-value category to keep fighting for mobile parity on.
