---
status: accepted
---

# Adopt Astro's conventional `src/` layout

The codebase has historically kept `pages/`, `components/`, `modules/`, `lib/` at the repo root with no `src/` directory. Astro's own convention, starter templates, and most integration docs assume `src/pages`, `src/content`, `src/components`, etc. We considered keeping the root-level layout (configuring Astro to look outside `src/`) to avoid file-moving churn, but decided the ongoing friction of fighting the framework's default assumptions outweighs a one-time move. We adopt `src/` for all application code (`src/pages/`, `src/components/`, `src/modules/`, `src/lib/`, `src/styles/`), preserving the existing folder taxonomy and boundaries (`components/ui/`, `components/layout/`, `components/page/`, `modules/<feature>/`) unchanged underneath it — this is a relocation, not a reorganization.

`_content/` and `_data/` move to `src/content/` and `src/data/` respectively (dropping the underscore prefix, matching Astro's content-collections convention), rather than staying at the root with a custom content-layer base path.

The `~/*` import alias is preserved but repointed from the repo root to `src/`, so existing import statements across ported code don't need rewriting — only the `tsconfig.json` path mapping changes.

## Consequences

- Every existing path reference in `CLAUDE.md`'s Architecture section changes prefix (e.g. `lib/posts.ts` → `src/lib/posts.ts`).
- `public/` and config files (`astro.config.mjs`, `netlify.toml`, etc.) stay at the repo root, per Astro convention — only application code and content move under `src/`.
