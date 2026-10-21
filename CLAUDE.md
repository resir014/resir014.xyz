# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website for resir014.xyz, built with **Astro 7 + Tailwind 3** and deployed on Netlify via `@astrojs/netlify`. It was migrated from Next.js 14; see [Astro 7 migration](#astro-7-migration) for what must be preserved and what is still being verified.

## Project philosophy

AI assistance on this project is limited to **architecture and plumbing**. Design and writing stay human.

- **Design needs a human touch.** Do not make visual design decisions: layout, spacing, typography, colour, imagery, motion, or copy tone.
  - When porting or refactoring (including the Astro migration), reproduce the existing design faithfully.
  - When new UI is needed, build the structure and wiring, reuse existing `src/components/ui/` pieces and tokens (without extending the deprecated Chungking system; see below), and leave the design choices to the user. Ask rather than invent.
- **Never write post or page content, even when asked.** This covers Markdown bodies in `src/content/`: posts of every kind, pages, etc pages, and projects.
  - Allowed exceptions:
    1. **Proofreading and grammar checking.** Report the issues and suggested corrections to the user and let them apply the fixes. Do not edit the prose yourself.
    2. **Structural plumbing edits.** Rewriting asset paths or links (e.g. for path-aware asset imports) and renaming or migrating frontmatter keys are allowed. Change only that structure and leave every word of prose untouched.

## Commands

pnpm (`pnpm-lock.yaml`, pinned via `packageManager`), Node 22.22+ (`.nvmrc`, `engines.node`; Astro 7 requires it).

```bash
pnpm dev          # dev server at localhost:4321
pnpm build        # astro build (static pages + the Netlify function for /api/trpc)
pnpm test         # type-check + lint (there is no unit test runner)
pnpm validate     # astro sync + lint + type-check (what CI runs)
pnpm type-check   # astro check (type-checks .astro, .ts, and .tsx)
pnpm lint         # eslint over all JS/TS/Astro
pnpm lint:fix
pnpm exec eslint path/to/file.astro   # lint a single file
```

The Husky pre-commit hook runs lint-staged: `eslint --fix` on JS/TS/Astro, then `prettier --write` (with `prettier-plugin-astro`). Prettier uses single quotes, 100-column lines, `arrowParens: avoid`, and `trailingComma: es5`. ESLint (v8, `.eslintrc.js`) extends `kentcdodds` + `kentcdodds/react` + `jsx-a11y`, with `eslint-plugin-astro` 1.x for `.astro` files; React rules are turned off for `.astro`. `astro build` does not lint, so run `pnpm lint` yourself.

`tsconfig.json` extends `@epic-web/config/typescript` and `astro/tsconfigs/strict`, with `verbatimModuleSyntax` (type-only imports must use `import type` or inline `type`) and `noUncheckedIndexedAccess` (indexed access may be `undefined`).

Env vars are listed in `.env.example`. They keep their `NEXT_PUBLIC_` names (they are set on Netlify). `astro.config.mjs` loads `.env.local` and `.env` into `process.env` for local development. The Google, Twitch, and Spotify credentials are only needed for `/dashboard`.

## Architecture

Astro `src/` layout (ADR-0006). The import alias `~/*` maps to `src/` (`~/lib/posts` is `src/lib/posts.ts`). `public/`, `config/`, and the config files stay at the repo root.

### Content pipeline

- **`src/content/`** holds the Markdown sources (CC BY-NC-SA). `src/data/` holds JSON site config: metadata, nav menu, footer links, linktree.
  - `src/content/posts/<kind>/YYYY-MM-DD-slug.md`: `kind` is `article | bookmark | jam | photo | video`. The date comes from the filename; frontmatter `date` overrides it.
  - `src/content/pages/*.md` maps to `/<slug>`, `src/content/etc/*.md` maps to `/etc/<slug>`, and `src/content/projects/*.md` maps to `/projects/<slug>`.
- **Content collections** (`posts`, `pages`, `etc`, `projects`) are defined in `src/content.config.ts`, with Zod schemas that mirror the existing frontmatter. Entry IDs are the raw filenames (a custom `generateId`), because Astro's default slugifier would change Permalinks like `tailwindcss-2.0`.
- **Loaders** (`src/lib/posts.ts`, `src/lib/pages.ts`, `src/lib/projects.ts`) wrap `getCollection` and return the props types in `src/types/` (`BasePostProps` etc.). `getPosts(kind)` sorts newest first; a Post's `slug` is `YYYY/MM/DD/slug`. `content` is the entry's rendered HTML (`entry.rendered.html`), which components output with `<Fragment set:html>`. Pages and projects are sorted by filename.
- **Rendering** (ADR-0007, amended): plain `.md` through the `unified()` processor from `@astrojs/markdown-remark`, configured in `astro.config.mjs` to reproduce the old markdown-it output. It is CommonMark with raw HTML, GFM limited to tables and strikethrough, and no smart punctuation. The project-local plugins live in `src/lib/markdown/`:
  - `remark-implicit-figures`: an image alone in its paragraph becomes `<figure>` (no caption).
  - `remark-relative-images`: relative image paths stay as authored instead of becoming Astro image imports.
  - `rehype-message-box`: `div.message` / `div.message--warning` (Callouts) get `MessageBox`'s classes, via `messageBoxClassName` in `src/components/ui/message-box/message-box-class-name.ts`.
  - `rehype-element-classes`: post-body styles for `iframe/pre/figure/figcaption/img`.
  - `rehype-internal-links`: strips trailing slashes from root-relative links. External links open in a new tab via `rehype-external-links`.
  - `rehype-raw` runs first, because Astro only parses raw HTML after user plugins. Content authors depend on these conventions.
  - Code blocks use Astro's Shiki with `github-dark-default`, with the Twoslash-era foreground restored. Astro also adds `id`s to headings.
- **Assets**: Markdown and `header_image` frontmatter point to absolute `/assets/<kind>/<year>/<slug>/...` paths. Those files live in `public/assets/`, whose folder layout mirrors the content tree. Nothing is imported relative to the Markdown file.
- **Post URLs**: `/posts/YYYY/MM/DD/slug`, `/jam/...`, `/photos/...`, `/videos/...` (`[...slug].astro` routes). Bookmarks have no detail pages; they are listed on `/bookmarks` and link out externally. `src/modules/posts/utils/slug-by-category.ts` builds these paths. It also knows a `note` kind (`/notes/`), but that kind has no content or route. Pages are built as `.html` files (`build.format: 'file'`, `trailingSlash: 'never'`); use `getPagePath(Astro.url)` from `src/lib/page-path.ts`, not `Astro.url.pathname`, which includes `.html` at build time.
- **Post dates** are formatted in `Asia/Jakarta` (`src/lib/date-formatter.ts`), the timezone Permalinks are dated in.

### IndieWeb and microformats2

All content and every post kind follow the IndieWeb specification and are marked up with microformats2 (https://indieweb.org/microformats). See `docs/adr/0003-indieweb-and-microformats2.md`. Post kinds are IndieWeb post types; when adding or changing one, start from its indieweb.org definition.

- Microformats classes sit alongside Tailwind classes, and some elements are hidden and exist only for parsers. Do not remove them as cleanup.
- Tailwind's `h-*` utilities (e.g. `h-full`) look like microformats roots to parsers. Existing ones are part of today's parsed output, but don't add new `h-*` utilities to elements inside an Entry without checking the mf2 output (use `size-*` for image fills).
- `src/modules/posts/post.astro` is the `h-entry` root for posts, `/<slug>` pages, and `/etc` pages.
- `post-header.astro` provides `p-name`/`p-summary`, `post-meta.astro`/`post-date.astro` provide the hidden `u-url` and `dt-published`, and `post-body.astro` provides `e-content`/`u-syndication`.
- `post-h-card.astro` is the author `h-card` (`p-author`). List items carry their own `h-entry`, and photos use `u-photo`.
- `src/layouts/default-layout.astro` emits `rel="me"` links from `src/data/site-metadata.json` `author.url`.
- Not yet marked up:
  - Bookmarks have no `h-entry` or `u-bookmark-of`.
  - Index pages have no `h-feed`.
  - Videos and jams have no `u-video`.

### RSS feeds

`src/pages/posts/{rss.xml,atom.xml,feed.json}.ts` are static endpoints that build the Feed with the `feed` package (`src/lib/rss.ts`). Only articles are included. `DefaultLayout` advertises them via `<link rel="alternate">`. The `feedLinks` inside `src/lib/rss.ts` point to `/rss/...`, which does not match where the feeds are served.

### Pages, layouts, UI

- `src/pages/` holds `.astro` routes: data loading in the frontmatter and `getStaticPaths`, plus composition. Every page wraps itself in `src/layouts/default-layout.astro`. Its props set the page's SEO: `title`, `titleTemplate`, `description`, `openGraph` (type, image, `article` times), `noindex`, and `youtubePreconnect` for pages whose content may embed YouTube. `src/lib/seo.ts` holds the defaults.
- Components follow ADR-0002. Static components are `.astro`. These stay React:
  - the design-system components in `src/components/ui/`, rendered without hydration from `.astro`;
  - interactive islands: the navbar menu (`navbar-menu.tsx`, Headless UI `Popover`), the footer GA opt-out link, `src/modules/video/lite-youtube.tsx`, the `/design` colour swatch grids, and the Dashboard widgets.
- An island is wrapped in a `display: contents` `<astro-island>`, so a parent's `space-y-*` cannot space hydrated children. Make the island render the spaced container itself (see `color-swatch-grid.tsx`, `dashboard-widgets.tsx`). React components rendered from `.astro` with children get the same kind of wrapper; for `MessageBox`, use `messageBoxClassName` on a plain `div` instead.
- `src/components/layout/` is the site shell (navbar, footer, container). `src/components/page/` holds generic page body/meta pieces. `src/modules/<feature>/` holds feature-specific components (posts, projects, photos, video, home, design, linktree, live, spotify, dashboard).
- Styling uses Tailwind 3 (via `postcss.config.js`) with the `@resir014/tailwind-preset-chungking` preset (the `chungking-*` color tokens; `@resir014/chungking-core` is imported directly in `tailwind.config.js`, `src/layouts/default-layout.astro`, and `src/modules/design/color-specs.astro` but is only a transitive dependency) and `@tailwindcss/typography`.
  - **Chungking is deprecated** (see the migration section and ADR-0004), so don't extend it.
  - Global CSS lives in `src/styles/` and is imported by `DefaultLayout`. `config/flavour-text.js` (the homepage Flavour text) is not used anywhere.

### The one dynamic part

Most of the site is prerendered, but **`/api/trpc` is not** (ADR-0005). `src/pages/api/trpc/[trpc].ts` sets `prerender = false` and serves the tRPC v10 router (`src/server/routers/{twitch,spotify,youtube}.ts`, with fetchers in `src/server/data/`) through tRPC's fetch adapter. The Netlify adapter turns it into a Netlify function. The `/dashboard` page itself is static. Its `DashboardWidgets` island queries the API through React Query, using `src/lib/trpc.ts` and `src/lib/trpc-provider.tsx`; hooks are in `src/lib/twitch-api.ts`, `src/lib/youtube-api.ts`, and `src/modules/spotify/`. `src/lib/base-url.ts` resolves the site URL from Netlify's `CONTEXT`/`URL`/`DEPLOY_PRIME_URL`.

### Deploy config

`netlify.toml` is the single source for security headers, the immutable caching of `/_astro/*`, and the joke redirects for `/.env` and `/wp-*`. `@astrojs/sitemap` excludes `/etc/something-amazing`; an integration in `astro.config.mjs` also publishes the sitemap index as `/sitemap.xml`. `src/pages/robots.txt.ts` blocks GPTBot.

## Astro 7 migration

Implemented on `refactor/astro-7-rewrite`. Final verification on a Netlify deploy preview is still open; see `plans/astro-pnpm-migration.md`. The decisions are recorded in `docs/adr/0001-migrate-to-astro-7.md`, `docs/adr/0002-astro-first-components-with-react-islands.md`, `docs/adr/0005-dashboard-as-astro-server-endpoint.md`, `docs/adr/0006-adopt-astro-src-layout.md`, and `docs/adr/0007-plain-markdown-with-rehype-remark.md`, constrained by `docs/adr/0003-indieweb-and-microformats2.md` and `docs/adr/0004-deprecate-chungking-for-rebrand.md`. Any further change must preserve:

- **Route structure and URLs**: every path above, including `/posts/YYYY/MM/DD/slug`, the `/etc/*` and top-level Markdown pages, and no trailing slashes (`/foo/` redirects to `/foo`).
- **RSS/Atom/JSON feeds** at their public URLs (`/posts/rss.xml`, `/posts/atom.xml`, `/posts/feed.json`).
- **Asset references stay absolute, not path-aware**: content assets remain centralized under `public/assets/<kind>/<year>/<slug>/...`, referenced by absolute `/assets/...` paths (ADR-0001 amendment). The Markdown conventions above (implicit figures, `.message` boxes, Shiki code blocks, external-link handling) must keep working.
- **IndieWeb microformats2 markup** (ADR-0003). Check changes with a microformats parser.
- Sitemap/robots behaviour, SEO/OpenGraph meta, and the Netlify headers/redirects.

Design system:

- **Chungking is deprecated** (`docs/adr/0004-deprecate-chungking-for-rebrand.md`). A future rebrand will replace it with **Tailwind CSS v4 themes** and UI components styled with **Tailwind + class-variance-authority (CVA)**. This includes dropping the Tailwind 3 preset/`tailwind.config.js` setup and the `chungking-*` tokens.
- Until then, code keeps its existing Chungking classes as-is. Don't add tokens or build new abstractions on top of Chungking.
- The rebrand's visual design is the user's (see Project philosophy). Claude's part is limited to the plumbing: the Tailwind v4 theme setup and CVA variant APIs for `src/components/ui/`.
- The rebrand is being worked on **in parallel**. Expect `src/components/ui/` and the styling layer to change, and keep styling changes in other work minimal so the two efforts do not conflict.

## Agent skills

### Domain docs

Single-context: `CONTEXT.md` (glossary, including IndieWeb/microformats terms) and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Implementation Plans

Deferred work of any kind — not just the Astro/pnpm migration — is tracked as plan files in `plans/`. Each plan is a self-contained specification covering the problem, solution, step-by-step implementation tasks, key decisions, verification approach, and explicit out-of-scope items. See [`plans/README.md`](plans/README.md) for the full document format.

**When authoring a plan**, any code snippets, file names, directory layouts, identifiers, and task descriptions must follow the project's established coding styleguide, naming conventions, and tooling rules (ESLint, Prettier, the `~/*` import alias, and the conventions elsewhere in this file). Use canonical terms from [`CONTEXT.md`](CONTEXT.md) when naming domain concepts in the plan (Post, Post kind, Entry, Permalink, TIL entry, etc.) — do not introduce synonyms for canonical terms. If the user's prompt explicitly overrides a convention, note the deviation and its justification in the plan's `## Decision Document`; otherwise assume the defaults apply.

**When assigned to work from a plan:**

1. **Read `CONTEXT.md` and `docs/adr/` first** to ground yourself in domain vocabulary and prior decisions before reading the plan. Canonical terms in the plan must be used as-is in commit messages and new code.
2. **Scan `plans/` for related or overlapping plans.** Note any ordering dependencies before starting. If a related plan is in-progress, resolve the dependency with the user before proceeding.
3. **Read the plan file in full** before touching any code.
4. **Update `status` to `in-progress`** in the plan's frontmatter.
5. **Follow the tasks in order.** Each task must leave `pnpm run validate` passing before moving to the next.
6. **Verify per the plan's `## Verification` section** — this project has no unit test runner, so verification means the manual/build checks named there (route diffing, `pnpm build` output, RSS/microformats spot checks, visual comparison), not automated tests.
7. **Do not expand scope** beyond what the plan describes — consult the "Out of Scope" section if in doubt.
8. **Remove the plan file** once all tasks are complete and the work is verified.
