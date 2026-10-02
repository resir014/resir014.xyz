---
status: accepted
---

# Host the Dashboard as a server-rendered Astro route via the Netlify adapter

ADR-0001 left open how `/dashboard`'s tRPC route (Twitch/YouTube/Spotify) would be hosted once the rest of the site becomes purely static output. We considered a standalone Netlify Function (more separation, but duplicates deploy config and loses framework integration) and dropping the Dashboard entirely (a product decision, not a technical one). We chose to keep the tRPC router in-process and switch only this route to server rendering via `@astrojs/netlify`, using Astro's per-route rendering modes to keep every other page statically generated.

## Consequences

- The Astro config and adapter setup must support mixed static/server output (`output: 'hybrid'` or per-route `prerender = false`), not a single global rendering mode.
- The tRPC router and Netlify Function fetchers under `server/` port over largely as-is; only the route entry point changes from a Next.js API route to an Astro endpoint.
