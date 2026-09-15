# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **single-context** repo: one `CONTEXT.md` and one `docs/adr/` at the repo root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root: the glossary of domain terms (posts, post kinds, pages, feeds, and the IndieWeb/microformats vocabulary).
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. The IndieWeb/microformats2 commitment and the Astro 7 migration decisions live here.
- **https://indieweb.org/microformats** and the IndieWeb page for the relevant post type (e.g. https://indieweb.org/bookmark) are the upstream specification for any change to how content is modelled or marked up.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The producer skill (`/grill-with-docs`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-migrate-to-astro-7.md
│   ├── 0002-astro-first-components-with-react-islands.md
│   ├── 0003-indieweb-and-microformats2.md
│   └── 0004-deprecate-chungking-for-rebrand.md
└── (app source at repo root; no src/)
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0002 (Astro-first components) — but worth reopening because…_
