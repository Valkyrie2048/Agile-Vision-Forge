---
name: API security baseline
description: How CORS, security headers, and rate limiting are configured on the Express API server
---

The API server (`artifacts/api-server`) uses `helmet()` for security headers, a CORS allowlist built from `REPLIT_DOMAINS` (production) plus localhost/`*.replit.dev` regexes (dev only), and `express-rate-limit` on public POST routes (contact/project submission, 10 req/15min per IP).

**Why:** the original setup used `cors()` with no options (reflects any origin) and had no rate limiting on public-facing form endpoints — both flagged in a full-site security audit.

**How to apply:** when adding new public-facing mutation routes, apply the same `submissionLimiter` (or a similar limiter) rather than leaving them unprotected. If a new production custom domain is added, it must be reflected in `REPLIT_DOMAINS` or the CORS allowlist will reject it.
