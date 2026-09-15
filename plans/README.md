# Plans

This directory contains deferred implementation plans for future agent sessions.

Each plan file is a self-contained specification that captures enough context for an agent to pick up and execute the
work without relying on prior conversation history. Plans cover the goal, implementation steps, key decisions, and any
relevant constraints already made.

## Usage

When starting work on a plan, read the plan file in full before making any changes. Update the frontmatter `status` to
`in-progress` when work begins, and remove the plan file once the work is complete.

## Authoring Conventions

Plan files describe work that will be executed against this codebase, so the content of a plan must align with the
project's established standards. When you author a plan:

- Follow the coding styleguide, naming conventions, and tooling rules already in force (ESLint's `kentcdodds` +
  `kentcdodds/react` + `jsx-a11y` + `@next/next` configs, Prettier, the `~/*` root import alias, and anything
  referenced from [`CLAUDE.md`](../CLAUDE.md)).
- Keep any code snippets, file paths, identifiers, and directory layouts consistent with those rules. Do not propose a
  solution that would fail `yarn lint` or `yarn type-check`.
- Use canonical terms from [`CONTEXT.md`](../CONTEXT.md) when naming domain concepts (Post, Post kind, Entry,
  Permalink, etc.) — do not introduce synonyms for terms already defined there.
- If the originating prompt explicitly overrides a convention, document the deviation and its justification in
  `## Decision Document` so future agents know it was deliberate. Absent an override, assume the defaults apply.

## Document Format

Each plan is a Markdown file with YAML frontmatter followed by a fixed set of sections.

### Frontmatter

```yaml
---
title: Short descriptive title
status: proposed | in-progress | completed
created: YYYY-MM-DD
---
```

### Sections

All sections below are required unless marked optional.

**`## Problem Statement`** Describe the current state and why it is a problem. Be specific — name the files, types, or
behaviours that are broken or limiting. An agent reading this section should be able to understand the motivation
without any prior context.

**`## Solution`** Describe the intended outcome at a high level. Cover the structural or behavioural changes being made,
but leave the detail to the tasks section. State any plans this work depends on.

**`## Tasks`** A list of discrete, ordered tasks. Each task must leave `yarn validate` (lint + type-check) passing —
run it before moving on. Use `### N. Task Title` subheadings for each task. Describe what files to add, change, or
remove, and explain why. If a task installs or removes npm packages, include the exact `yarn add` / `yarn remove`
commands in a code block.

**`## Decision Document`** A set of named decisions. Each entry states the decision made, then the reasoning behind it.
Write one decision per paragraph with a bold lead label. Include decisions that were actively considered and rejected,
not just the ones adopted — future agents need to know what was ruled out and why.

**`## Verification`** Describe how correctness will be checked. This project has no unit test runner (`yarn test` is
lint + type-check only), so name the concrete manual/build checks instead: which routes to diff against the current
site, which `yarn build` output to inspect, which microformats/RSS output to validate, and any visual comparison
needed for faithfully-ported pages.

**`## Out of Scope`** A bullet list of things explicitly excluded from this plan. This prevents scope creep and signals
to a future agent that a missing feature was a deliberate choice, not an oversight.

**`## Further Notes`** _(optional)_ References, links, naming conventions, or other context that does not fit the
sections above.
