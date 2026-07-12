---
name: runtimeErrorOverlay placement
description: @replit/vite-plugin-runtime-error-modal must stay inside the dev-only guard in vite.config.ts or it blanks the Replit preview pane on any runtime error.
---

The plugin injects client-side code that:
1. Listens for `window.addEventListener("error")` and `unhandledrejection`
2. Sends them to the Vite dev server via HMR
3. Vite server sends `runtime-error-plugin:notify-parent` back
4. Client calls `window.parent.postMessage({ type: "runtime-error", id: null }, "*")`
5. Replit's preview pane receives this and blanks the iframe

**Why:** The plugin was placed outside the `process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined` guard, making it always-on. Any unhandled error (including `SecurityError` from `localStorage` in a sandboxed iframe) would blank the preview.

**How to apply:** In `vite.config.ts`, always keep `runtimeErrorOverlay()` inside the same dev-only conditional as `cartographer` and `devBanner`. An `ErrorBoundary` in `main.tsx` handles React render errors without needing the overlay plugin.
