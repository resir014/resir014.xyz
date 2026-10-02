---
status: accepted
---

# Migrate from Next.js to Astro 7

The site is almost entirely static content, but it runs on Next.js 14 (Pages Router) with a client-side React runtime for every page. We will migrate to Astro 7. The public surface must be preserved exactly: route structure and URLs (including `/posts/YYYY/MM/DD/slug`), the RSS/Atom/JSON feeds at their current URLs, sitemap/robots behaviour, SEO meta, and the Netlify headers and redirects.

Tooling is reset alongside the migration: the package manager moves from Yarn 1 to pnpm, and the baseline runtime is Node 22 locally, in CI, and on Netlify.

**Amendment (2026-09-15):** Path-aware Markdown asset colocation is deferred out of this migration. Content assets stay in `public/assets/<kind>/<year>/<slug>/...`, referenced by the same absolute `/assets/...` paths as today. Colocating assets with their Markdown source can be revisited later as a separate, non-blocking pass.

## Consequences

- The Next-only pieces go away: `next/link`, `next-seo`, `next/head`, NProgress, the `htmr` HTML-to-React step, `next-sitemap`, and `@netlify/plugin-nextjs`. The Markdown conventions they supported (implicit figures, callouts, Shiki code blocks, external links opening in a new tab) must be reproduced in Astro's Markdown pipeline.
- The **Dashboard** depends on a server-side tRPC route, which does not fit a purely static build. Resolved in ADR-0005: it becomes a server-rendered Astro route via the Netlify adapter, with the rest of the site remaining statically generated.
- Because assets are not colocated, Astro's content collections gain no asset-resolution benefit from location — Markdown image/link handling should keep treating `/assets/...` as site-root-relative, same as the current `markdown-it` + `htmr-transform` pipeline.
