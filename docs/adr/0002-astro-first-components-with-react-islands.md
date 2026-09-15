---
status: accepted
---

# Astro-first components, with React kept for the design system and interactive islands

During the Astro 7 migration (ADR-0001), pages, layouts, and every fully static component are rewritten as `.astro` files rather than rendering existing React components through Astro's React integration. There are two exceptions that stay React. First, the design-system components in `components/ui/` are kept as they are, so they remain usable from both `.astro` files and React islands. Second, components with interactive elements stay React, and React is limited to the interactive part, hydrated as an island, so static markup ships no JavaScript.

## Consequences

- A component that mixes static layout with a small interactive piece should be split: the static shell goes to `.astro`, and only the interactive part becomes a React island. Current examples of interactive parts: the navbar popover, the footer analytics opt-out, the lite YouTube embed, the design-page colour swatch (copy to clipboard), and the Dashboard widgets.
- A future reader will see React components under `components/ui/` that render nothing interactive. That is deliberate and should not be "fixed" by converting them to `.astro`.
