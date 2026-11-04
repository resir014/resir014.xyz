---
status: accepted
---

# Deprecate the Chungking design system in favour of a rebrand on Tailwind v4 and class-variance-authority

The site's current look comes from the Chungking design system:

- the `@resir014/tailwind-preset-chungking` Tailwind 3 preset;
- the `chungking-*` colour tokens, with `@resir014/chungking-core` pulled in transitively;
- the React components in `components/ui/`.

Chungking is deprecated. A future rebrand will replace it with Tailwind CSS v4 themes and UI components styled with Tailwind and class-variance-authority (CVA) for variants. The rebrand's visual design is a human decision (see "Project philosophy" in `CLAUDE.md`). AI assistance covers only the plumbing: the Tailwind v4 theme setup and CVA variant APIs.

**Amendment (2026-11-04):** The Tailwind engine moves to v4 ahead of the rebrand, as plumbing with no visual change. Chungking keeps working unchanged through v4's `@config` (the legacy `tailwind.config.js` with the preset), and `src/styles/global.css` carries Tailwind v3 compatibility styles so the site renders as it did on v3. The rebrand still owns replacing the preset, the `chungking-*` tokens, and `@config` with CSS-first `@theme` tokens, and drops the compatibility styles once the components that need them are rebuilt.

## Consequences

- Chungking gets no further investment. Don't add tokens, extend the preset, or build new abstractions on `chungking-*` classes. Code being ported (including in the Astro migration, ADR-0001) keeps its existing Chungking styling as-is until the rebrand replaces it.
- The `components/ui/` layer that ADR-0002 keeps in React is the layer the rebrand will rebuild with Tailwind and CVA. The `/design` page (`modules/design/`) is a specimen of Chungking and will need replacing with the new brand.
- The rebrand is being worked on **in parallel** with the Astro migration (ADR-0001). Migration work should expect `components/ui/` and the styling layer to change underneath it. Keep styling changes during porting minimal so the two efforts do not conflict.
