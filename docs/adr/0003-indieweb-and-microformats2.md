---
status: accepted
---

# All content follows the IndieWeb specification, marked up with microformats2

resir014.xyz is an IndieWeb site. Every post and page, and every post kind, follows the IndieWeb definitions (https://indieweb.org/microformats). Each is published with microformats2 so feed readers, Webmention tools, and other IndieWeb sites can parse it: `h-entry` for entries, `h-card` for the author, `rel="me"` identity links, and the matching property classes (`p-name`, `e-content`, `dt-published`, `u-url`, `u-photo`, `u-syndication`, …). Post kinds are IndieWeb post types, not an invented taxonomy, so new kinds or changes to existing ones should start from the IndieWeb definition for that type.

## Consequences

- Microformats classes and hidden elements (e.g. the invisible `u-url` permalink or `u-email` in the author card) sit next to Tailwind utility classes. They look unused to anyone reading the markup, but they are load-bearing and must not be removed as cleanup.
- Any rewrite of a component that renders content, including the Astro 7 migration (ADR-0001, ADR-0002), must emit the same microformats as before. Changes should be checked with a microformats parser.
