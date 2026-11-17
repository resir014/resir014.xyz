---
title: Migrate from Chungking to the rebrand's design tokens
status: in-progress
created: 2026-11-17
---

## Problem Statement

The site's colours and fonts still come from the deprecated Chungking design system (ADR-0004):

- `src/styles/global.css` loads `tailwind.config.js` through `@config`. That config applies the
  `@resir014/tailwind-preset-chungking` preset, which defines nine `chungking-*` colour families
  (`grey`, `red`, `orange`, `green`, `turquoise`, `blue`, `ultramarine`, `purple`, `magenta`) plus
  `chungking-white`/`chungking-black`, the `shadow-single`/`shadow-double` shadows, and the font
  stacks (`Inter` for `font-sans`, `JetBrains Mono` for `font-mono`).
- `@resir014/chungking-core` is imported directly in `tailwind.config.js` (the `gray` alias, the
  `prose-chungking` link colours, `shadow-hero-inner`, `shadow-header-inset`),
  `src/layouts/default-layout.astro` (`theme-color` and `msapplication-TileColor`), and
  `src/modules/design/color-specs.astro` (the `/design` swatches).
- 44 files under `src/` use `chungking-*` classes. Grey is the most used family, mostly `grey-100`,
  `grey-500`, and `grey-800`.
- Inter is configured as `font-sans` and loaded from the `typeface-inter` package, imported in
  `src/layouts/default-layout.astro`. JetBrains Mono is self-hosted from `src/fonts/`.

The brand design is now done. The branding manual (kept outside the repository, Illustrator export dated
2026-10-13) defines six colour scales, BDO Grotesk as the sans font, and JetBrains Mono as the mono
font. Nothing in the codebase uses them yet.

## Solution

Migrate **additively**. Put the brand tokens next to Chungking without changing how the site looks.
Then restyle one component at a time, with the user deciding how each one looks. Remove Chungking
only once nothing references it.

1. Define the brand colours as CSS-first `@theme` tokens in a new `src/styles/theme.css`, using
   **role names** (`neutral`, `primary`, `secondary`, `accent`, `success`, `error`). Nothing uses
   them yet, so the site looks the same.
2. Self-host BDO Grotesk from `src/fonts/` and make it `font-sans`, replacing Inter, and remove
   `typeface-inter`. It is the plan's one site-wide visual change and gets its own task and review.
3. **Reskin** the current pages: swap their `chungking-*` classes for brand tokens without
   redesigning their layout. The user decides each colour mapping. The agent makes the edits.
4. Remove the Chungking preset, the `chungking-core` imports, and both packages once nothing uses
   `chungking-*`.

Ordering within the wider rebrand:

- A **full redesign** is in progress. The homepage and the linktree come first. In the new design
  they load the same content, and they are tracked in the user's own plan, not this one. Tasks 1
  and 2 should land before that work so it can build on the tokens and the font. Task 3 comes after,
  and only reskins the pages that keep their current layout, so it does not touch
  `src/modules/home/` or `src/modules/linktree/`.

Dependencies:

- **Task 4 depends on** three pieces of work that each remove `chungking-*` usages this plan does not
  restyle (see Task 3): the homepage/linktree redesign, the `src/components/ui/` CVA rebuild
  (rebrand checklist), and the `/design` specimen replacement (rebrand checklist).
- This plan does **not** remove `@config` or `tailwind.config.js`. Loading `@tailwindcss/typography`
  with `@plugin` and deleting `tailwind.config.js` is the next checklist item. Task 4 leaves
  `tailwind.config.js` holding only the typography configuration.

## Tasks

### 1. Add the brand colour tokens

**Done (2026-11-17).** The `dist/` HTML was identical apart from the CSS filename hash and the
sitemap/feed build timestamps. The only CSS difference was three `--color-<role>-*` declarations
that no rule uses. Tailwind emits them because its automatic source detection scans `plans/*.md`,
which mentions their names.

Create `src/styles/theme.css` with a single `@theme` block, and import it in `src/styles/global.css`
straight after `@import 'tailwindcss';`. Add a header comment that names the branding manual as the
source and points to ADR-0004.

The six scales, with each role's manual name in a comment:

| Shade | `neutral` (Void) | `primary` (Signal Blue) | `secondary` (Arc Cyan) | `accent` (Hazard Amber) | `success` (Signal Green) | `error` (Signal Red) |
| ----- | ---------------- | ----------------------- | ---------------------- | ----------------------- | ------------------------ | -------------------- |
| 50    | `#F5F7FA`        | `#ECF7FF`               | `#D6FFFF`              | `#FFF0DD`               | `#D0FFE0`                | `#FFEFEB`            |
| 100   | `#E7E9EF`        | `#BFD7FF`               | `#C3F9FF`              | `#FFE9D1`               | `#95FFBC`                | `#FFCCC4`            |
| 200   | `#D2D6DE`        | `#95B9FF`               | `#9CEFFF`              | `#FFD8B4`               | `#69F8A0`                | `#FFA79C`            |
| 300   | `#B7BCC7`        | `#6E9BFF` ¹             | `#58E2FF`              | `#FFBE87`               | `#4FE28B`                | `#FF7E72`            |
| 400   | `#959BA8`        | `#4A7CFF`               | `#0BCDFC`              | `#FF9C42`               | `#2BC873`                | `#FF4440`            |
| 500   | `#767C89`        | `#2D5CFF`               | `#00B6E4`              | `#FD7C00`               | `#00AE5B`                | `#EF1F27`            |
| 600   | `#5C626E`        | `#1E43EE`               | `#0095C0`              | `#D06100`               | `#008C3E`                | `#D40004`            |
| 700   | `#444851`        | `#1123D4`               | `#007396`              | `#A14800`               | `#006A2B`                | `#AB0000`            |
| 800   | `#2F3238`        | `#0F00B7`               | `#00516C`              | `#732F00`               | `#004B1A`                | `#800000`            |
| 900   | `#1D1F23`        | `#07007D`               | `#003044`              | `#481800`               | `#002E09`                | `#540000`            |
| 950   | `#0C0D0F`        | `#020044` ¹             | `#00111D`              | `#1F0400`               | `#001501`                | `#280000`            |

¹ Corrected from the manual. See the "Manual errata" decision.

Write each shade as `--color-<role>-<shade>: #RRGGBB;`, for example:

```css
@theme {
  /* Neutral // Void */
  --color-neutral-50: #f5f7fa;
  /* ... */
  --color-neutral-950: #0c0d0f;

  /* Primary // Signal Blue */
  --color-primary-50: #ecf7ff;
  /* ... */
}
```

`neutral-*` replaces Tailwind's default `neutral` palette, which nothing in `src/` uses. The rest of
Tailwind's default palette stays (`ring-black` and `bg-red-500` are still used). Keep the colour
literals as written in the table. Changing their case is fine, but check that Prettier leaves the
file stable.

Nothing references the new utilities yet, so the build output for existing pages must not change
(see Verification).

### 2. Self-host BDO Grotesk and make it `font-sans`

**Done (2026-11-17), reviewed by the user.** `--font-sans` from `theme.css` wins over the preset's
stack, both for `.font-sans` and for the base `html` font (`--default-font-family`), so no
`tailwind.config.js` override was needed. `typeface-inter` and its import were removed. Layout
adjustments for the new font's metrics are left to the Task 3 reskin.

BDO Grotesk is on neither Google Fonts nor Fontsource (checked 2026-11-17). The user supplied the
foundry package (version 2.000, © 2017 Lokal Container, designed by Deni Anggara, **SIL Open Font
License 1.1**). It has a variable font with one `wght` axis from 300 to 900 (default 400), which
covers every weight the manual lists, Light (300) to Black (900). It also has seven static `woff2`
weights and no italic.

**Already done (2026-11-17):** these files are in place but nothing loads them yet:

- `src/fonts/bdo-grotesk/BDOGrotesk-VF.woff2` (99 KB): the variable font, converted from the
  package's `BDOGrotesk-VF.ttf` with
  `uvx --from fonttools --with brotli fonttools ttLib.woff2 compress`.
- `src/fonts/bdo-grotesk/LICENSE`: copied verbatim from `OFL.txt` in the official repository,
  https://github.com/LCTipografi/BDO-Grotesk (blob `45afb69`). The foundry package didn't include a
  licence, and OFL requires the licence to ship with the font.

The foundry package itself was not committed. If the font has to be rebuilt, ask the user for it.

Remaining:

- Add `src/fonts/bdo-grotesk.css` with a single `@font-face`: `font-family: 'BDO Grotesk'`,
  `font-style: normal`, `font-weight: 300 900`, `font-display: swap`, and
  `src: url('./bdo-grotesk/BDOGrotesk-VF.woff2') format('woff2')`. Import it in
  `src/layouts/default-layout.astro` next to `~/fonts/jetbrains-mono.css`.
- In `src/styles/theme.css`, set `--font-sans: 'BDO Grotesk', ui-sans-serif, system-ui,
sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';`.
- The Chungking preset also sets `fontFamily.sans` through `@config`. Check which one wins in the
  built CSS (`--font-sans` in `dist/_astro/*.css`). If the preset's `Inter` stack still wins,
  override `theme.extend.fontFamily.sans` in `tailwind.config.js` for now with the same stack, and
  note that Task 4 removes the override.

**Stop for user review** before going on. The font changes the metrics of all text on the site.
The user checks the key routes (see Verification) and decides whether any layout adjustment
belongs in this task or in a later restyle.

### 3. Reskin the current pages onto the brand tokens (user-led, repeated)

Start after the homepage/linktree redesign has landed, so the reskin follows the colour usage the
redesign sets. This is a **reskin**: swap colour classes and values only, and leave layout, spacing,
and markup as they are. The full redesign replaces these pages later.

The user decides the mapping for each component: which role and shade replaces each `chungking-*`
class. The agent makes the edits. Do not choose mappings yourself, and do not apply a blanket
substitution such as "grey → neutral" unless the user tells you to. Each batch of edits must leave
`pnpm validate` passing and is reviewed visually before the next.

Inventory of what to restyle, grouped so batches can follow it (`grep -rn chungking src` is the
source of truth):

- **Site shell:** `src/components/layout/{layout-root,footer}.astro`,
  `src/components/layout/navbar/{navbar.astro,navbar-items.tsx,navbar-menu.tsx}`,
  `src/components/layout/ga-opt-out-link.tsx`, `src/components/page/{page-body,page-meta-item}.astro`.
- **Posts:** `src/modules/posts/{post-body,post-date,post-h-card,post-list-item,featured-post-list-item}.astro`,
  `src/modules/bookmarks/bookmark-list-item.astro`, `src/modules/photos/*`,
  `src/modules/video/video-card.astro`.
- **Projects:** `src/modules/projects/*`.
- **Dashboard islands:** `src/modules/dashboard/stat-block.tsx`, `src/modules/live/live-stream-status.tsx`,
  `src/modules/spotify/{spotify-currently-playing,spotify-top-track-item}.tsx`.
- **Global styles and Markdown output:**
  - `src/styles/global.css`: the `a:focus` ring, and the v3-compat default border colour
    `theme(colors.gray.200)`, which needs a literal `var(--color-…)` replacement.
  - `src/styles/lite-youtube.css`: the focus ring.
  - `src/lib/markdown/rehype-element-classes.ts`: the `img` background.
  - `tailwind.config.js`: the `prose-chungking` link colours. Write them as `var(--color-…)` strings
    so they don't depend on `chungking-core`.
- **Values with no class:**
  - `theme-color` and `msapplication-TileColor` in `default-layout.astro` (currently
    `colors.blue[500]`). Use a literal hex from the table above.
  - `shadow-single`/`shadow-double` (Chungking) and `shadow-hero-inner`/`shadow-header-inset`
    (`tailwind.config.js`). The manual defines no shadows. If the user keeps any of them, move the
    current values into `@theme` as `--shadow-*` literals so they no longer depend on Chungking.
- **Generated variant names:** `src/lib/color-generator.ts` picks one of seven Chungking family
  names from a Post's slug, and `src/modules/posts/utils/featured-post-variant.ts` turns that name
  into classes. The user decides the new set of variants. Changing the list's length or order
  reshuffles which colour each featured Post gets, and that is expected. No content frontmatter
  depends on these names.

**Not restyled here:** these are left for other work so the same components aren't restyled twice.
Leave their `chungking-*` classes alone.

- `src/modules/home/` and `src/modules/linktree/` belong to the homepage/linktree redesign.
- `src/components/ui/` (`avatar`, `badge`, `divider`, `message-box`) belongs to the CVA rebuild.
- `src/modules/design/*` and `src/pages/design.astro` belong to the `/design` specimen replacement.

### 4. Remove Chungking

Start only when `grep -rn "chungking" src tailwind.config.js` finds nothing except
`tailwind.config.js`'s `presets` entry, the `prose-chungking` variant name, and the
`@resir014/chungking-core` import, and the homepage/linktree redesign, the CVA rebuild, and the
`/design` replacement have all landed.

- In `tailwind.config.js`, remove the `presets` entry, the `chungking-core` import, `colors.gray`,
  and the `boxShadow` entries that Task 3 moved into `@theme`. Also remove any temporary
  `fontFamily.sans` override from Task 2. What remains is the `typography` configuration and the
  plugin, for the next checklist item to move to `@plugin`.
- Add `--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
'Liberation Mono', 'Courier New', monospace;` to `src/styles/theme.css`. The preset used to
  provide that font family.
- Remove the packages:

```bash
pnpm remove @resir014/tailwind-preset-chungking @resir014/chungking-core
```

- Update the `@config` comment in `src/styles/global.css` to say that only the typography plugin is
  left in JavaScript.

### 5. Update the docs

- `CLAUDE.md`: tick the token item in "Rebrand progress". Replace the Chungking styling notes with
  the token roles in `src/styles/theme.css` and BDO Grotesk loading. Fix the statement that
  `chungking-core` is only a transitive dependency (it is listed in `package.json`).
- `docs/adr/0004-deprecate-chungking-for-rebrand.md`: add an amendment recording the role-named
  tokens and the additive migration.

## Decision Document

**Additive migration rather than a one-pass mapping.** The new brand has six colour families and
Chungking has nine plus white and black, so `turquoise`, `ultramarine`, `purple`, and `magenta` have
no obvious replacement. Choosing one is a visual design decision, which the project philosophy keeps
with the user. A mapping table filled in up front and applied mechanically was considered and
rejected: it forces every old colour to map 1:1 and puts many design decisions into a single pass.

**Role names, not brand names.** Tokens are named `neutral`, `primary`, `secondary`, `accent`,
`success`, and `error`, as the manual's role labels say. They line up with the CVA variants the
rebuild will expose (`MessageBox` already has `primary`/`success`/`warning`/`error`). The brand
names (Void, Signal Blue, Arc Cyan, Hazard Amber, Signal Green, Signal Red) appear only as comments.
Two alternatives were rejected: brand-named utilities, and brand-named scales with role-named
aliases (too much indirection for a personal site).

**Hex literals, with two corrections (manual errata).** The manual's hex values are used, except
for two that were copied from the wrong swatch:

- Signal Blue 300 is printed as `#B7BCC7` (Void 300). Its RGB `110 155 255` and OKLCH
  `0.70 0.16 264°` give `#6E9BFF`.
- Signal Blue 950 is printed as `#0C0D0F` (Void 950). Its RGB `2 0 68` gives `#020044`.

Two other errors don't affect the hex values. Arc Cyan 300 lists RGB `88 266 255`, where the
correct value is `88 226 255`. Signal Red 400's RGB and CMYK were copied from Signal Green 400. The
OKLCH values were rejected as the source because the manual rounds them to two decimals.

**BDO Grotesk is self-hosted from `src/fonts/`.** It is on neither Google Fonts nor Fontsource
(checked 2026-11-17), so the user supplied the foundry package (OFL 1.1). Self-hosting matches
JetBrains Mono, avoids a third-party request, and needs no change to `netlify.toml`.

**One variable `woff2` instead of the static weights.** The user asked for the best and most
compatible option. The converted variable font is 99 KB (measured 2026-11-17), about the size of
two static weights (about 49 KB each). The site's text already uses at least three weights
(regular, `font-semibold`, `font-bold`), so the variable file means fewer bytes and one request
instead of three or more. It also lets the redesign use any weight from 300 to 900 at no extra
cost. Variable fonts in `woff2` work in every current browser. A very old browser without
variable-font support renders the default 400 instance and fakes bold, which is acceptable. The
static `woff2` files were rejected but stay in the foundry package if that tradeoff changes.

**Inter is removed with the font switch.** The plan first assumed Inter was never loaded, but
`typeface-inter` was imported in `default-layout.astro`, so the visible change is Inter → BDO
Grotesk. Once nothing used Inter, the user chose to remove `typeface-inter` in Task 2 rather than
waiting for Task 4. The `/design` page still mentions Inter in its copy. That belongs to the
`/design` specimen replacement.

**Font-metric layout fixes wait for the reskin.** The user decided Task 2 is only the font change.
Any layout adjustment the new metrics need happens during Task 3 or the redesign.

**No italic font file.** BDO Grotesk has no italic, so `<em>` and `italic` text in the sans font
will be slanted by the browser. Choosing another approach (another font for emphasis, or
`font-synthesis: none`) is a design decision for the user, so this plan leaves it alone.

**The font switch is a task of its own.** `--font-sans` changes every page, and unlike the colours
the manual leaves no choice in it, so it is applied globally. It still gets a separate task and a
review stop, because the new metrics can reflow layouts.

**Tailwind's default palette stays for now.** Clearing it (`--color-*: initial`) would remove
`ring-black` and `bg-red-500`, which are still used. Deciding whether the site should have only
brand colours is left for later.

**`src/components/ui/` and `/design` are left to their own plans.** Restyling them here would
duplicate the CVA rebuild and the specimen replacement and risk conflicts with work running in
parallel (ADR-0004).

## Verification

- **Task 1:** `pnpm validate` passes. Run `pnpm build` before and after the change and diff
  `dist/` (excluding `dist/_astro/*.css`). The HTML must be identical. In the new CSS, the only
  differences should be the `--color-<role>-*` custom properties.
- **Task 2:** `pnpm build`. Check that the font files are emitted under `dist/_astro/`, that the
  built CSS resolves `--font-sans` to the BDO Grotesk stack, and that no requests go to a third
  party. The user compares these routes in `pnpm dev` before and after: `/`, `/posts`, one Article
  Permalink with code blocks and a Callout, `/photos`, `/projects`, a project page, `/bookmarks`,
  `/dashboard`, and `/design`.
- **Task 3:** after each batch, `pnpm validate` and a visual check of the routes it touches with the
  user. For Post components, run a microformats2 parser over one Article Permalink and one listing
  page, and compare the parsed JSON before and after (ADR-0003). Don't add `h-*` utilities inside an
  Entry.
- **Task 4:** `grep -rn "chungking" src tailwind.config.js package.json` finds only the
  `prose-chungking` variant name. `pnpm build` succeeds and the `dist/` HTML is identical to the
  build just before Task 4 (the restyle already removed every class usage). Check that `font-mono`
  code blocks still render in JetBrains Mono.
- **Every task:** run `pnpm lint` yourself (`astro build` does not lint).

## Out of Scope

- Replacing the logo with the new "RESI" wordmark, the site icons, and `public/social.png`. That
  is `plans/rebrand-logo.md`. The logo uses `currentColor`, so it needs no colour token here.
- Loading `@tailwindcss/typography` with `@plugin`, renaming `prose-chungking`, and deleting
  `tailwind.config.js` (the next checklist item).
- The CVA rebuild of `src/components/ui/` and the `/design` specimen replacement (separate checklist
  items).
- Removing the Tailwind v3 compatibility styles in `global.css`.
- Spacing, radius, and motion tokens. The manual doesn't define them yet.
- Extra JetBrains Mono weights. The manual shows Thin to ExtraBold, but only the weights in
  `src/fonts/jetbrains-mono/` are loaded. Add more only when a restyle needs them.
- A light theme or `dark:` variants. The site is dark-only today.
- Preloading the font files with `<link rel="preload">`.

## Further Notes

- The manual says its colour combinations are "to be used with discretion, this is not a strict
  palette", so not every scale has to appear on the site.
- The manual's WCAG 2.1 contrast labels (`AA`, `AAA`, `UI`, `FAIL` against white and black) are
  useful when the user picks text colours in Task 3. The site's dark background is closest to
  `neutral-900`/`neutral-950`.
- The branding manual, the asset package, and the foundry font package are kept outside the
  repository. This plan copies every value it needs from them. Ask the user if anything else is
  needed.
