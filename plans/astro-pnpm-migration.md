---
title: Migrate to Astro 7 + pnpm
status: in-progress
created: 2026-09-15
---

## Problem Statement

The site runs on Next.js 14 (Pages Router) with a client-side React runtime for every page, even though it is almost entirely static content. `docs/adr/0001-migrate-to-astro-7.md` records the decision to move to Astro 7, with Yarn 1 replaced by pnpm and the Node baseline raised to 22. Several structural and tooling decisions that the ADR left open have since been resolved (`docs/adr/0005`–`0007`) and need to be executed as an actual migration.

This plan covers the **faithful port only**: same routes, same content, same rendered output, same IndieWeb markup, same feeds, on new tooling. It does not add new functionality.

## Solution

Port every route, layout, and content type from Next.js to Astro 7, preserving the public surface exactly (routes/URLs, RSS/Atom/JSON feed URLs, sitemap/robots, SEO meta, Netlify headers/redirects — per ADR-0001). Along the way:

- Adopt Astro's `src/` layout (ADR-0006): relocate `pages/`, `components/`, `modules/`, `lib/`, `styles/` under `src/` with their current names and boundaries unchanged; move `_content/`/`_data/` to `src/content/`/`src/data/`; repoint the `~/*` alias to `src/`.
- Replace the `markdown-it` + `htmr` pipeline with Astro's native Markdown rendering, plain `.md` (not MDX), per ADR-0007: HTML passthrough plus a project-local rehype plugin for `.message` boxes, `rehype-image-toolkit` (`implicitFigure: true`) for implicit figures, Astro's built-in Shiki (`github-dark`, no Twoslash) for code blocks.
- Port content collection loaders (`lib/posts.ts`, `lib/pages.ts`, `lib/projects.ts`, `lib/item-by-slug.ts`) to Astro content collections with a Zod schema matching today's frontmatter shape — a structural port, not a content-model redesign.
- Port every IndieWeb microformats2 emission point (`h-entry`, `h-card`, `rel="me"`, `dt-published`, `u-url`, `u-syndication`, `u-photo`) to the new `.astro` components, per ADR-0003.
- Port RSS/Atom/JSON feed generation (`lib/rss.ts`, using the `feed` package) into an Astro endpoint, keeping the current public URLs.
- Move `/dashboard`'s tRPC route to a server-rendered Astro route via `@astrojs/netlify`, per ADR-0005, with the rest of the site remaining statically generated.
- Switch Yarn 1 → pnpm and bump the Node baseline to 22, updating CI, Husky/lint-staged, and `netlify.toml` to match.
- Keep existing Chungking Tailwind classes as-is (no rebrand work — that's separate, parallel work per ADR-0004).
- Keep Photo/Video post kinds and their content/routes exactly as they are today (the "freeze" on new Photo/Video posts is purely editorial, requires no code change, and is already in effect regardless of migration status).

This plan does not include `/til` or any post-kind rework — those are separate, later plans (see Out of Scope).

## Tasks

### 1. Tooling switch: Yarn 1 → pnpm, Node 22

- Replace `yarn.lock` with `pnpm-lock.yaml`; set `packageManager` in `package.json`.
- Update the Husky pre-commit hook and lint-staged config for pnpm.
- Update the CI workflow: `yarn install --frozen-lockfile` → pnpm equivalent, `actions/setup-node` bumped from 18 to 22.
- Update `netlify.toml`: drop `YARN_VERSION`, set the Netlify build Node version to 22.
- Bump `.nvmrc` to 22, set `engines.node` in `package.json`.
- Update the README's documented commands.

### 2. Scaffold Astro project and `src/` layout

- Add Astro 7, `@astrojs/react`, `@astrojs/netlify`, `@astrojs/sitemap`, `rehype-image-toolkit`, `rehype-external-links`, `eslint-plugin-astro` via `pnpm add`.
- Create `astro.config.mjs`: React integration, sitemap integration, Netlify adapter, hybrid/per-route rendering output (needed for task 8's Dashboard route).
- Move `pages/`, `components/`, `modules/`, `lib/`, `styles/` under `src/`, preserving names/boundaries (ADR-0006).
- Move `_content/` → `src/content/`, `_data/` → `src/data/` (drop underscore prefix).
- Update `tsconfig.json`: repoint `~/*` to `src/*`.
- Update ESLint config to include `eslint-plugin-astro` and lint `.astro` files.

### 3. Content collections

- Define Astro content collections (`posts`, `pages`, `etc`, `projects`) in `src/content/config.ts` with Zod schemas matching today's frontmatter fields exactly.
- Port `lib/posts.ts`, `lib/pages.ts`, `lib/projects.ts`, `lib/item-by-slug.ts` to the content collections API. Preserve the post `slug` shape (`YYYY/MM/DD/slug`) and the `kind` (article/bookmark/jam/photo/video) taxonomy as-is.

### 4. Markdown rendering pipeline

- Configure Astro's Markdown/Shiki settings (theme `github-dark`, no Twoslash).
- Write the project-local rehype plugin that injects `MessageBox`'s resolved Tailwind classes onto raw `.message`/`.message--warning` divs (matching `components/ui/message-box/message-box.tsx`'s variant-to-class mapping).
- Add `rehype-image-toolkit` with `implicitFigure: true`; verify it doesn't apply unwanted side effects from its other bundled image features (bare URLs, sizing) to existing content.
- Add `rehype-external-links` (or equivalent) for external links opening in a new tab, matching `htmr-transform`'s current behavior.
- Verify Shiki code fence output visually matches today's `github-dark` theme.

### 5. Pages, layouts, routing

- Rewrite `pages/` route files as `.astro` pages/layouts per ADR-0002 (static content → `.astro`; interactive islands stay React: navbar popover, footer GA opt-out, `lite-youtube`, `color-swatch`, Dashboard widgets).
- Reproduce every route: `/posts/YYYY/MM/DD/slug`, `/jam/...`, `/photos/...`, `/videos/...`, `/bookmarks`, `/<slug>` pages, `/etc/<slug>`, `/projects/<slug>`, trailing-slash behavior.
- Port `next-sitemap` config to `@astrojs/sitemap` (same excludes, e.g. `/etc/something-amazing`; same `robots.txt` GPTBot block).
- Port the joke redirects (`/.env`, `/wp-*`) and security headers from `next.config.js`/`netlify.toml` into Astro/Netlify config, keeping both in sync as today.

### 6. IndieWeb microformats2 port

- Port every markup point listed in `CLAUDE.md`'s IndieWeb section to the new `.astro` components: `h-entry` root, `p-name`/`p-summary`, `u-url`/`dt-published`, `e-content`/`u-syndication`, author `h-card`/`p-author`, `rel="me"` links, list-item `h-entry`, `u-photo`.
- Preserve the documented gaps as-is (bookmarks without `h-entry`/`u-bookmark-of`, no `h-feed` on index pages, no `u-video` on videos/jams) — not in scope to fix during this port.

### 7. RSS/Atom/JSON feeds

- Port `lib/rss.ts` (using `feed`) into an Astro endpoint producing the same three files at their current public URLs (`/posts/rss.xml`, `/posts/atom.xml`, `/posts/feed.json`).
- Articles only, same as today.

### 8. Dashboard as a server-rendered Astro route

- Per ADR-0005: convert `pages/api/trpc/[trpc].ts` to an Astro server endpoint with `@astrojs/netlify`, keeping `server/routers/{twitch,spotify,youtube}.ts` and `server/data/` fetchers largely as-is.
- Convert the Dashboard page itself to a hybrid-rendered `.astro` page with React island widgets (Twitch/Spotify/YouTube), replacing `ssr: false` React Query usage with Astro's client-directive hydration.
- Verify env vars (`.env.example`) still resolve correctly under the new route.

### 9. Deploy config parity

- Diff `netlify.toml` and the new Astro/Netlify adapter output against today's headers, caching, and redirect behavior.
- Confirm `@netlify/plugin-nextjs` removal doesn't drop any behavior it was implicitly providing.

## Decision Document

**`src/` layout adopted (ADR-0006).** Astro's convention and tooling assume `src/`; fighting it creates ongoing friction. Considered keeping root-level layout — rejected because it fights every Astro doc/example for no lasting benefit.

**Content moved to `src/content/`/`src/data/`, underscore dropped.** Matches Astro's content-collections convention and simplifies content-layer config. Considered keeping `_content/`/`_data/` at root with a custom base path — rejected in favor of following the framework default now that a directory move is already happening.

**`~/*` alias kept, repointed to `src/`.** Preserves import style across all ported code; only `tsconfig.json` changes. Considered switching to Astro's typical relative/`@/*` convention — rejected as pure churn with no functional benefit.

**Plain `.md` + rehype/remark, not MDX (ADR-0007).** `MessageBox` and figures turned out to be fully reproducible via class injection on raw HTML; no content actually needs a live component instance. Considered MDX — rejected as a much larger content-plumbing task for no current benefit; can be revisited later if genuine component embedding is needed.

**`rehype-image-toolkit` for implicit figures.** Actively maintained, `implicitFigure: true` documented to match pandoc/`markdown-it-implicit-figures` semantics exactly. Considered `remark-figure-caption` (archived, author recommends against it), `rehype-figure` (unpublished in 6 years), and a custom plugin (unnecessary once a maintained match was found).

**Twoslash dropped.** No content uses its type-query annotations; adding it back would be speculative. Astro's built-in Shiki covers the actually-used syntax highlighting with zero extra dependencies.

**`feed` package kept for RSS/Atom/JSON.** Already framework-agnostic and produces all three formats from one call; `@astrojs/rss` only covers RSS2 XML and would mean maintaining two approaches instead of one.

**Dashboard hosted as a server-rendered Astro route via `@astrojs/netlify` (ADR-0005).** Closest to current architecture (tRPC stays in-process); considered a standalone Netlify Function (more separation, more duplicated config) and dropping the Dashboard (a product decision, not a technical one) — both rejected.

**Chungking classes ported as-is; no rebrand work.** The Tailwind v4/CVA rebrand is separate, parallel, human-design-led work per ADR-0004 and project philosophy. Bundling it here would conflate two differently-owned, differently-sized efforts.

**Photo/Video kept, not folded or removed.** Existing content and permalinks stay live; only new authoring of these kinds stops, and that's an editorial choice with no code implications, not something this migration needs to touch.

**Asset colocation deferred (ADR-0001 amendment).** Content assets stay in `public/assets/<kind>/<year>/<slug>/...` with absolute-path references, unchanged from today. Colocating assets with content can be revisited as a separate, non-blocking pass later.

## Verification

Given inbound links to this site's permalinks matter and there is no automated test suite (`pnpm run validate` is lint + type-check only), verification is full per-page, not sampled:

- **Route parity**: script comparing every URL Next.js's `getStaticPaths` generates today against Astro's generated routes — every post (all kinds), every page, every etc page, every project. No URL should appear, disappear, or change shape.
- **Feed parity**: normalized diff (accounting for build-time timestamps) of `/posts/rss.xml`, `/posts/atom.xml`, `/posts/feed.json` between the old and new builds — same items, same URLs, same content.
- **Microformats parity**: for every published post/page (not a sample), run a microformats2 parser against both old and new output and diff the extracted properties (`h-entry`, `h-card`, `rel=me`, `dt-published`, etc.).
- **Sitemap/robots parity**: diff `sitemap.xml` and `robots.txt` output between builds.
- **Visual parity**: spot-check each distinct template/layout (article, bookmark, jam, photo, video, page, etc-page, project, index pages) — full per-template check, not per-post, since design must stay faithful per project philosophy (design decisions are out of scope for this migration).
- **Deploy config parity**: diff response headers and redirect behavior between the current Netlify deploy and a preview deploy of the migrated site.
- **Dashboard**: manually verify Twitch/YouTube/Spotify data still loads correctly under the new server-rendered route.

## Out of Scope

- `/til` section (new content type, separate plan — see grilling session 2026-09-15).
- Any post-kind rework beyond the existing Photo/Video freeze (which is purely editorial and already in effect; no code change).
- The Tailwind v4/CVA rebrand and Chungking removal (ADR-0004; separate, parallel, human-design-led work).
- Path-aware Markdown asset colocation (deferred per the ADR-0001 amendment).
- Fixing the documented IndieWeb markup gaps (bookmarks' missing `h-entry`, index pages' missing `h-feed`, videos/jams' missing `u-video`) — ported as-is, gaps included.
- Any content schema redesign — content collection schemas mirror today's frontmatter exactly.

## Further Notes

Related ADRs: `docs/adr/0001` (amended), `0002`, `0003`, `0004`, `0005`, `0006`, `0007`. Domain terms used above (Post, Post kind, Entry, Permalink) are canonical per `CONTEXT.md`.
