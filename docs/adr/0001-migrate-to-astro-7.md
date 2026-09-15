---
status: accepted
---

# Migrate from Next.js to Astro 7

The site is almost entirely static content, but it runs on Next.js 14 (Pages Router) with a client-side React runtime for every page. We will migrate to Astro 7. The public surface must be preserved exactly: route structure and URLs (including `/posts/YYYY/MM/DD/slug`), the RSS/Atom/JSON feeds at their current URLs, sitemap/robots behaviour, SEO meta, and the Netlify headers and redirects. Markdown content becomes path-aware, meaning it imports its content assets relative to its own location instead of using absolute `/assets/...` paths into `public/`.

Tooling is reset alongside the migration: the package manager moves from Yarn 1 to pnpm, and the baseline runtime is Node 22 locally, in CI, and on Netlify.

## Consequences

- The Next-only pieces go away: `next/link`, `next-seo`, `next/head`, NProgress, the `htmr` HTML-to-React step, `next-sitemap`, and `@netlify/plugin-nextjs`. The Markdown conventions they supported (implicit figures, callouts, Shiki code blocks, external links opening in a new tab) must be reproduced in Astro's Markdown pipeline.
- The **Dashboard** depends on a server-side tRPC route, which does not fit a purely static build. How it is hosted is still undecided and must be settled before that page is migrated.
