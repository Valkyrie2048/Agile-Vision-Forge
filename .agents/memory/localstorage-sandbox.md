---
name: localStorage in sandboxed iframes
description: localStorage.getItem/setItem throws SecurityError in sandboxed iframes; always wrap in try/catch, especially in ThemeProvider and any component that persists state to storage.
---

**Why:** Replit's canvas embeds artifacts in iframes. Depending on sandbox flags, `localStorage` access can throw a `SecurityError`. Without a try/catch, this propagates to `window.onerror`, triggers the `runtimeErrorOverlay` plugin, and blanks the preview.

**How to apply:** Wrap every `localStorage` read/write in a try/catch that falls back gracefully. For `ThemeProvider`, default to `"dark"` on error. For component-level keys (like tour-seen flags), silently ignore the error and treat storage as unavailable.
