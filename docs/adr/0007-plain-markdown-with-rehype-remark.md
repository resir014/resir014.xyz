---
status: accepted
---

# Plain Markdown with rehype/remark plugins, not MDX

Today, `htmr-transform` converts specific HTML output into React components at render time: `.message`/`.message--warning` divs become `<MessageBox>`, `img`/`pre`/`figure`/`iframe` get restyled, and internal links are routed through `next/link`. Astro's idiomatic answer to "Markdown needs custom components" is MDX, which lets content embed real components directly. We considered migrating all of `_content/` to `.mdx`, but rejected it: `MessageBox` (`components/ui/message-box/message-box.tsx`) turned out to be a purely presentational wrapper whose Tailwind classes are fully determined by the `variant` prop, itself derived from the existing `message`/`message--warning` class names already authored directly in Markdown as raw HTML. The same is true for figures and code blocks. None of the "component swap" behavior actually requires a live component instance — it can be reproduced by a rehype plugin injecting the equivalent classes onto the raw HTML during the build.

We keep all `_content/` as plain `.md`, with html passthrough (standard CommonMark HTML-block behavior) reproducing raw `<div class="message">` markup as-is, and a small project-local rehype plugin injecting the resolved Tailwind utility classes onto `.message`/`.message--warning` divs, matching `MessageBox`'s current variant-to-class mapping. Migrating to MDX remains available later if a genuine need for live component embedding in content emerges.

**Amendment (2026-10-21):** Implementing this decision changed three of its details:

- `rehype-image-toolkit` is not used. Its `implicitFigure` option always adds a `<figcaption>` built from the alt text, which `markdown-it-implicit-figures` (default options) never did, so it would have added visible captions under most content images. Implicit figures use a project-local remark plugin instead (`src/lib/markdown/remark-implicit-figures.ts`): a paragraph whose only child is an image renders as `<figure>`, which is exactly the markdown-it rule.
- Astro 7 made Sätteri its default Markdown processor, which does not run remark or rehype plugins. The pipeline uses the `unified()` processor from `@astrojs/markdown-remark`, configured to match markdown-it's defaults: no smart punctuation, and GFM limited to tables and `~~strikethrough~~` (so footnotes and bare URLs still render as plain text).
- Shiki Twoslash's `github-dark` theme is the palette that current Shiki calls `github-dark-default`, with an older foreground colour. The config uses `github-dark-default` with that foreground restored.

## Consequences

- No content file changes format or extension — `.message` divs, images, and code fences are authored exactly as they are today.
- Content authors do not get access to live Astro/React components inside post bodies; anything that needs one must go through the rehype-plugin pattern (matching HTML output to injected classes) or wait for a future MDX migration.
- Implicit figures use `rehype-image-toolkit`'s `implicitFigure: true` option (matches `markdown-it-implicit-figures`/pandoc semantics: an image alone in its paragraph becomes a `<figure>`). Code highlighting uses Astro's built-in Shiki (theme `github-dark`), without Twoslash — no content currently uses Twoslash's type-query annotations, so it is dropped rather than ported speculatively. Feed generation keeps the existing `feed` npm package (framework-agnostic, already produces RSS2/Atom/JSON from one call), ported into an Astro endpoint instead of a `getStaticProps` side effect.
