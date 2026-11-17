---
title: Replace the logo and site icons with the rebrand's RESI wordmark
status: proposed
created: 2026-11-17
---

## Problem Statement

The site still carries the old resir014 logo, a chevron mark by Lvyathan drawn with gradient fills:

- `src/components/ui/logo.tsx` exports `Logo`, an inline SVG of the old mark with two hard-coded
  `linearGradient` fills. It is exported from `src/components/ui/index.ts` but not rendered anywhere.
- `public/resir014-logo-light.svg` is the old mark as a static file. Nothing in `src/` references
  it, but other sites might link to it.
- The site icons come from the old mark: `public/favicon.ico`, `public/favicon-16x16.png`,
  `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`,
  `public/android-chrome-512x512.png`, `public/mstile-150x150.png`. They are linked from
  `src/layouts/default-layout.astro` and `public/manifest.json`.
- `public/manifest.json` hard-codes `theme_color: #0070f3` and `background_color: #16161d`, which
  belong to neither Chungking nor the new brand.

The 2026 branding manual introduces a new mark, the "RESI" wordmark. The designer's exports are:

- `Resi Logo Only.svg`: the full wordmark. The viewBox is `0 0 2497.59 651.55`, with four paths,
  one per letter.
- `Resi_R.svg`: the "R" alone. The viewBox is `0 0 1233.34 1480`, with one path.

Both are filled with a single flat `#0B00CB`. That value is not one of the manual's swatches (see
Decision Document). The manual's rules for the mark:

- Clear space of 1X on every side, where X is one letter's width.
- Don't contort, stretch, or change its proportions.
- Don't place it against a border without breathing room.
- No gradients (flat colour only), and no drop shadows.

The source files are in the user's branding package (`Logo Only/`), which is not committed. Before
Task 1, ask the user to put `Resi Logo Only.svg` and `Resi_R.svg` somewhere the agent can read
them.

## Solution

1. Replace `Logo` with the new wordmark, and add `LogoMark` for the "R". Both are inline SVG React
   components that use `fill="currentColor"`, so the surrounding text colour sets the logo colour.
2. Regenerate the site icons from `Resi_R.svg`, in colours the user chooses, and update
   `public/manifest.json`.
3. Swap the default Open Graph image, `public/social.png`, once the user supplies a new one.

This plan provides the components and assets. Deciding **where** the logo appears on the site
(navbar, footer, linktree, hero) is design work for the user and is not part of it. The
homepage/linktree redesign comes first in the rebrand and is the most likely first user of the
logo, so Task 1 should land before or alongside it.

This plan is independent of `plans/rebrand-design-tokens.md`. The logo uses `currentColor`, so it
needs no colour token. The token plan's restyle (its Task 3) owns the `theme-color` and
`msapplication-TileColor` meta values. This plan's `manifest.json` colours should use the same
values once the user picks them.

## Tasks

### 1. Replace `Logo` with the RESI wordmark and add `LogoMark`

Rewrite `src/components/ui/logo.tsx`:

- `Logo` renders `Resi Logo Only.svg`. Copy the four `d` attributes exactly and keep
  `viewBox="0 0 2497.59 651.55"`.
- `LogoMark` renders `Resi_R.svg`. Copy the `d` attribute exactly and keep
  `viewBox="0 0 1233.34 1480"`.
- Remove the XML prolog, `id="LOGO"`, the `<style>` block, and `class="cls-1"`. Put
  `fill="currentColor"` on the `<svg>` element.
- Keep the existing signature, `React.ComponentProps<'svg'>`, spread onto the `<svg>` element.
  Don't set `preserveAspectRatio="none"` and don't add width/height defaults that would distort
  the mark. Callers set one dimension (for example `className="h-8 w-auto"`).
- Callers are responsible for accessibility. A decorative logo gets `aria-hidden="true"`, and a
  logo that links home gets an accessible name on its link. Document this in a short JSDoc comment
  on each component.
- Add a JSDoc note on `Logo` with the clear-space rule: the manual's 1X is one letter's width, which
  is 543 of the viewBox's 651.55 height units, so the clear space on each side equals ⅚ of the
  logo's rendered height. The component does **not** add that space as padding. Placement is the
  caller's (and the user's) concern.
- Export both from `src/components/ui/index.ts` (already `export * from './logo'`).

Nothing renders `Logo` today, so this task changes no page.

### 2. Regenerate the site icons from the "R"

**Prerequisite (user):** choose the icon's foreground and background colours. A favicon cannot use
`currentColor`. Also choose the manifest's `theme_color` and `background_color`, ideally the same
values the token plan uses for the `theme-color` meta.

Generate a new file for each existing icon path from `Resi_R.svg`. Keep the filenames so no other
links need to change:

- `public/favicon.ico` (16 and 32 px)
- `public/favicon-16x16.png`, `public/favicon-32x32.png`
- `public/apple-touch-icon.png` (180 px; iOS doesn't support transparency, so use a solid background)
- `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`
- `public/mstile-150x150.png`

The "R" is taller than it is wide (1233.34 × 1480). Centre it in the square canvas without stretching
it. The user decides the padding around the mark (the manual's clear-space rule is for the wordmark;
check with the user whether it also applies to the icon). Generate the files with a one-off command
(for example `pnpm dlx sharp-cli` or ImageMagick) run outside the repository. Don't add an image
tool to `package.json`, and commit only the output files.

Update `public/manifest.json` `theme_color` and `background_color` with the chosen values.

### 3. Swap the default social image

**Prerequisite (user):** supply the new default Open Graph image, 1200×630 to match the current
`summary_large_image` card. The decorative pieces in the asset megafolder are candidates, but which
one to use is the user's design decision.

Replace `public/social.png`, keeping the path, which `src/lib/seo.ts` builds from
`siteMetadata.siteUrl`.

## Decision Document

**`currentColor` instead of a logo colour token.** The exported fill `#0B00CB` matches no Signal
Blue swatch (`primary-800` is `#0F00B7`, `primary-700` is `#1123D4`). The user chose not to add a
dedicated token or snap to the nearest swatch. Instead the logo inherits its colour, so each place
the logo is used sets the colour with a text utility. The manual's "flat colour only" rule still
holds, because `currentColor` is a single colour. Also rejected: checking the value with the
designer before going ahead.

**Inline React components instead of `<img src>`.** `currentColor` only works on inline SVG. The
components stay React, in `src/components/ui/`, like the existing `Logo` (ADR-0002), so `.astro`
pages render them without hydration and the CVA rebuild can wrap them later.

**Keep the existing icon filenames.** Overwriting the same paths avoids touching `<link>` tags and
the manifest's `icons` array, and any external caches of the URLs pick up the new art. An SVG
favicon (`<link rel="icon" type="image/svg+xml">`) was considered and deferred. It would need its
own colours, or a `prefers-color-scheme` style inside the SVG, which is a design decision the user
hasn't made.

**`public/resir014-logo-light.svg` is left as it is.** Nothing in `src/` uses it, but it may be
linked from outside the site. Whether to replace it with the new wordmark (with a fixed fill),
delete it, or keep it is the user's call. Don't change it in this plan.

**The component doesn't add clear space.** Building the 1X padding into the SVG or the component
would surprise callers and fight with layout spacing. The rule is documented instead.

## Verification

- `pnpm validate` passes after each task. Run `pnpm lint` yourself.
- **Task 1:** temporarily render `<Logo class="h-16 w-auto text-…" />` and `<LogoMark … />` on a
  page in `pnpm dev`. Compare against `Resi Logo Only.png` and `Resi_R.png`: the shapes and
  proportions must match, and the logo must take its colour from the text utility. Remove the
  temporary usage before committing. `pnpm build` output must not change.
- **Task 2:** check that each regenerated file has the expected pixel size (`file public/*.png`),
  that `favicon.ico` contains 16 and 32 px images, and that the icons appear in a browser tab and in
  Chrome DevTools > Application > Manifest with no errors.
- **Task 3:** `pnpm build`, then check that `og:image` on `/` and on an Article without a Header
  image points to `/social.png`, and that the file is 1200×630.

## Out of Scope

- Placing the logo anywhere on the site (navbar, footer, linktree header, homepage hero). That is
  design work for the user.
- The `/design` page's logo section (`src/modules/design/logo-specs.astro`, `logo-card*.astro`,
  `public/static/brand/*`). It belongs to the `/design` specimen replacement, and its prose is the
  user's to write.
- `public/static/resir014-icon.png` (the `author.avatar` in `src/data/site-metadata.json`, and the
  linktree `Avatar`). That is the user's profile picture, not the logo.
- Using any of the decorative pieces in the asset megafolder on the site.
- Committing the branding package or the manual to the repository.

## Further Notes

- Glyph geometry in `Resi Logo Only.svg`: each letter is 543 units wide and 651.55 tall, with 108.6
  units between letters (R 0–543, E 651.6–1194.5, S 1303.1–1846.1, I 1954.6–2497.6).
- The `Logo Anatomy + Guide/` exports in the user's branding package show the clear-space
  construction.
