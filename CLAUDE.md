# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website for resir014.xyz. It is currently **Next.js 14 (Pages Router) + Tailwind 3**, deployed on Netlify via `@netlify/plugin-nextjs`. A **migration to Astro 7 is planned**; see [Astro 7 migration](#astro-7-migration) before making structural changes.

## Project philosophy

AI assistance on this project is limited to **architecture and plumbing**. Design and writing stay human.

- **Design needs a human touch.** Do not make visual design decisions: layout, spacing, typography, colour, imagery, motion, or copy tone.
  - When porting or refactoring (including the Astro migration), reproduce the existing design faithfully.
  - When new UI is needed, build the structure and wiring, reuse existing `components/ui/` pieces and tokens (without extending the deprecated Chungking system; see below), and leave the design choices to the user. Ask rather than invent.
- **Never write post or page content, even when asked.** This covers Markdown bodies in `_content/`: posts of every kind, pages, etc pages, and projects.
  - Allowed exceptions:
    1. **Proofreading and grammar checking.** Report the issues and suggested corrections to the user and let them apply the fixes. Do not edit the prose yourself.
    2. **Structural plumbing edits.** Rewriting asset paths or links (e.g. for path-aware asset imports) and renaming or migrating frontmatter keys are allowed. Change only that structure and leave every word of prose untouched.

## Commands

Yarn 1 (`yarn.lock`), Node 20 (`.nvmrc`).

```bash
yarn dev          # dev server at localhost:3000
yarn build        # next build && next-sitemap (sitemap + robots.txt)
yarn test         # type-check + lint (there is no unit test runner)
yarn validate     # lint + type-check (what CI runs)
yarn type-check   # tsc --noEmit
yarn lint         # eslint over all JS/TS
yarn lint:fix
npx eslint path/to/file.tsx   # lint a single file
```

The Husky pre-commit hook runs lint-staged: `eslint --fix` on JS/TS, then `prettier --write`. Prettier uses single quotes, 100-column lines, `arrowParens: avoid`, and `trailingComma: es5`. ESLint extends `kentcdodds` + `kentcdodds/react` + `jsx-a11y` + `@next/next`. `next build` skips ESLint, so run `yarn lint` yourself.

Env vars are listed in `.env.example`. The Google, Twitch, and Spotify credentials are only needed for `/dashboard`.

## Architecture

The import alias `~/*` maps to the repo root (there is no `src/`).

### Content pipeline

- **`_content/`** holds the Markdown sources (CC BY-NC-SA). `_data/` holds JSON site config: metadata, nav menu, footer links, linktree. The README calls these `content/` and `data/`, but the real directory names have leading underscores.
  - `_content/posts/<kind>/YYYY-MM-DD-slug.md`: `kind` is `article | bookmark | jam | photo | video`. The date comes from the filename; frontmatter `date` overrides it.
  - `_content/pages/*.md` maps to `/<slug>`, `_content/etc/*.md` maps to `/etc/<slug>`, and `_content/projects/*.md` maps to `/projects/<slug>`.
- **Loaders** (`lib/posts.ts`, `lib/pages.ts`, `lib/projects.ts`, `lib/item-by-slug.ts`) read files with `fs` + `gray-matter`. They take an explicit `fields: string[]` list and return only those keys, which keeps page props small. A field missing from the list will be `undefined` in the component. Post `slug` is returned as `YYYY/MM/DD/slug`.
- **Rendering**: `lib/markdown-to-html.tsx` turns Markdown into an HTML string at build time using markdown-it (`html: true`), `markdown-it-implicit-figures`, and Shiki Twoslash (`github-dark`). On the client, `htmr` + `lib/htmr-transform.tsx` convert that HTML into React elements. The transform restyles `img/pre/figure/iframe`, turns `div.message` / `div.message--warning` into `<MessageBox>`, sends internal links through `next/link`, and opens external links in a new tab. Content authors depend on these conventions.
- **Assets**: Markdown and `header_image` frontmatter point to absolute `/assets/<kind>/<year>/<slug>/...` paths. Those files live in `public/assets/`, whose folder layout mirrors the content tree. Nothing is imported relative to the Markdown file today.
- **Post URLs**: `/posts/YYYY/MM/DD/slug`, `/jam/...`, `/photos/...`, `/videos/...` (catch-all `[...slug]` routes). Bookmarks have no detail pages; they are listed on `/bookmarks` and link out externally. `modules/posts/utils/slug-by-category.ts` builds these paths. It also knows a `note` kind (`/notes/`), but that kind has no content or route.

### IndieWeb and microformats2

All content and every post kind follow the IndieWeb specification and are marked up with microformats2 (https://indieweb.org/microformats). See `docs/adr/0003-indieweb-and-microformats2.md`. Post kinds are IndieWeb post types; when adding or changing one, start from its indieweb.org definition.

- Microformats classes sit alongside Tailwind classes, and some elements are hidden and exist only for parsers. Do not remove them as cleanup.
- `modules/posts/post.tsx` is the `h-entry` root for posts, `/<slug>` pages, and `/etc` pages.
- `post-header.tsx` provides `p-name`/`p-summary`, `post-meta.tsx`/`post-date.tsx` provide the hidden `u-url` and `dt-published`, and `post-body.tsx` provides `e-content`/`u-syndication`.
- `post-h-card.tsx` is the author `h-card` (`p-author`). List items carry their own `h-entry`, and photos use `u-photo`.
- `layouts/default-layout.tsx` emits `rel="me"` links from `_data/site-metadata.json` `author.url`.
- Not yet marked up:
  - Bookmarks have no `h-entry` or `u-bookmark-of`.
  - Index pages have no `h-feed`.
  - Videos and jams have no `u-video`.

### RSS feeds

`getStaticProps` in `pages/posts/index.tsx` writes `public/posts/rss.xml`, `atom.xml`, and `feed.json` to disk as a build side effect. Only articles are included, and the files are gitignored. `pages/_app.tsx` advertises them via `<link rel="alternate">`. The `feedLinks` inside `lib/rss.ts` point to `/rss/...`, which does not match where the files are actually written.

### Pages, layouts, UI

- `pages/` holds thin route files: data loading in `getStaticProps`/`getStaticPaths` (`fallback: false`), plus composition. There are two layout styles:
  - Older pages wrap their JSX in `<DefaultLayout>` directly.
  - Newer pages set `Page.layout = page => <DefaultLayout>{page}</DefaultLayout>`, which `_app.tsx` applies. Use `createNextPage` / the `NextPage` type from `~/types/next` for this style.
- `components/ui/` is the reusable design-system layer (Avatar, Badge, Divider, Logo, MessageBox). `components/layout/` is the site shell (navbar, footer, container). `components/page/` holds generic page body/meta pieces.
- `modules/<feature>/` holds feature-specific components (posts, projects, photos, video, home, design, linktree, live, spotify, dashboard).
- Styling uses Tailwind 3 with the `@resir014/tailwind-preset-chungking` preset (the `chungking-*` color tokens; `@resir014/chungking-core` is imported directly in `tailwind.config.js`, `pages/_app.tsx`, and `modules/design/color-specs.tsx` but is only a transitive dependency) and `@tailwindcss/typography`.
  - **Chungking is deprecated** (see the migration section and ADR-0004), so don't extend it.
  - Global CSS lives in `styles/`. The homepage `FLAVOUR_TEXT` is picked at random at build time from `config/flavour-text.js` in `next.config.js`.

### The one dynamic part

Most of the site is static generation, but **`/dashboard` is not**. It calls a tRPC v10 API route (`pages/api/trpc/[trpc].ts` → `server/routers/{twitch,spotify,youtube}.ts`, with fetchers in `server/data/`). That route runs as a Netlify function, and the client queries it through React Query (`lib/trpc.ts`, `ssr: false`; hooks in `lib/twitch-api.ts`, `lib/youtube-api.ts`, `modules/spotify/`). `lib/base-url.ts` resolves the site URL from Netlify's `CONTEXT`/`URL`/`DEPLOY_PRIME_URL`.

### Deploy config

Security headers and immutable caching are defined in **both** `netlify.toml` and `next.config.js` `headers()`, so keep them in sync. `next.config.js` also has joke redirects for `/.env` and `/wp-*`. The `next-sitemap` config excludes `/etc/something-amazing` and blocks GPTBot in `robots.txt`.

## Astro 7 migration

Planned direction (not started). The decisions are recorded in `docs/adr/0001-migrate-to-astro-7.md` and `docs/adr/0002-astro-first-components-with-react-islands.md`, constrained by `docs/adr/0003-indieweb-and-microformats2.md` and `docs/adr/0004-deprecate-chungking-for-rebrand.md`. Any migration work must preserve:

- **Route structure and URLs**: every path above, including `/posts/YYYY/MM/DD/slug`, the `/etc/*` and top-level Markdown pages, and trailing-slash behaviour.
- **RSS/Atom/JSON feeds** at their current public URLs (`/posts/rss.xml`, `/posts/atom.xml`, `/posts/feed.json`).
- **Path-aware Markdown with asset imports**: content resolves its images and links according to its location in the content tree. The Markdown conventions that `htmr-transform` handles today (implicit figures, `.message` boxes, Shiki code blocks, external-link handling) must keep working.
- **IndieWeb microformats2 markup**: every rewritten component must emit the same `h-entry`/`h-card`/`rel="me"` markup and properties as before (ADR-0003).
- Sitemap/robots behaviour, SEO/OpenGraph meta, and the Netlify headers/redirects.

Tooling changes that are part of the migration:

- **Yarn 1 → pnpm**:
  - Replace `yarn.lock` with `pnpm-lock.yaml` and set the `packageManager` field.
  - Update the Husky/lint-staged hook, the CI workflow (`yarn install --frozen-lockfile`, `yarn run validate`), and `netlify.toml` (drop `YARN_VERSION`).
  - Update the README's commands.
- **Node 22 baseline**: bump `.nvmrc` and set `engines.node`. Then align `actions/setup-node` in CI (currently 18) and the Netlify build Node version to match.

Design system:

- **Chungking is deprecated** (`docs/adr/0004-deprecate-chungking-for-rebrand.md`). A future rebrand will replace it with **Tailwind CSS v4 themes** and UI components styled with **Tailwind + class-variance-authority (CVA)**. This includes dropping the Tailwind 3 preset/`tailwind.config.js` setup and the `chungking-*` tokens.
- Until then, ported code keeps its existing Chungking classes as-is. Don't add tokens or build new abstractions on top of Chungking.
- The rebrand's visual design is the user's (see Project philosophy). Claude's part is limited to the plumbing: the Tailwind v4 theme setup and CVA variant APIs for `components/ui/`.
- The rebrand is being worked on **in parallel** with the Astro migration. Expect `components/ui/` and the styling layer to change underneath migration work, and keep styling changes during porting minimal so the two efforts do not conflict.

Component strategy:

- **Rewrite to `.astro`**: every page, layout, and fully static component (`components/layout`, `components/page`, most of `modules/`).
- **Keep as React**:
  1. The reusable UI/design-system components in `components/ui/`.
  2. Components with interactive elements. Limit React to the dynamic part and hydrate it as an island. Current examples: the navbar (Headless UI `Popover`), the footer GA opt-out link, `modules/video/lite-youtube`, `modules/design/color-swatch` (clipboard), and the Twitch/Spotify/YouTube dashboard widgets.
- Next-specific pieces go away: `next/link`, `next-seo`, `next/head`, NProgress route events, `htmr` (Astro renders Markdown directly), `next-sitemap`, and `@netlify/plugin-nextjs`.
- The tRPC dashboard needs server/function support, which conflicts with a purely static output. Decide how to host it (Astro endpoint with the Netlify adapter, a standalone Netlify function, or dropping it) before migrating it.

## Agent skills

### Domain docs

Single-context: `CONTEXT.md` (glossary, including IndieWeb/microformats terms) and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
