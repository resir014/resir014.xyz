// @ts-check
import { copyFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import githubDarkDefault from '@shikijs/themes/github-dark-default';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeElementClasses from './src/lib/markdown/rehype-element-classes';
import rehypeInternalLinks from './src/lib/markdown/rehype-internal-links';
import rehypeMessageBox from './src/lib/markdown/rehype-message-box';
import remarkImplicitFigures from './src/lib/markdown/remark-implicit-figures';
import remarkRelativeImages from './src/lib/markdown/remark-relative-images';
import remarkTablesStrikethrough from './src/lib/markdown/remark-tables-strikethrough';

// Server code (the Dashboard's tRPC routers) reads `process.env`. Load local env files into it, as
// Next.js did. `.env.local` takes precedence; variables already set (e.g. on Netlify) are kept.
dotenv.config({ path: '.env.local' });
dotenv.config();

// Shiki Twoslash's `github-dark` is today's `github-dark-default` with its older foreground colour.
const githubDarkTwoslash = JSON.parse(
  JSON.stringify(githubDarkDefault).replaceAll(/#e6edf3/gi, '#c9d1d9')
);

const site =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  'https://resir014.xyz';

/**
 * Publishes the sitemap index at `/sitemap.xml` too, the URL that robots.txt and search engines
 * have always used.
 * @type {import('astro').AstroIntegration}
 */
const sitemapIndexAlias = {
  name: 'sitemap-index-alias',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site,
  // Static by default. Server-rendered routes (the Dashboard) opt out with `prerender = false`.
  output: 'static',
  adapter: netlify({
    // There are no edge functions, and emulating them fails to start Netlify's bundled Deno.
    devFeatures: { edgeFunctions: false, images: true, environmentVariables: false },
  }),
  // Canonical URLs have no trailing slash, same as the Next.js site.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    // Reproduces the markdown-it pipeline: CommonMark with raw HTML, tables and strikethrough, no
    // smart punctuation, and implicit figures.
    processor: unified({
      gfm: false,
      smartypants: false,
      remarkPlugins: [remarkTablesStrikethrough, remarkImplicitFigures, remarkRelativeImages],
      rehypePlugins: [
        // Astro only parses raw HTML after user plugins run. Parse it first so that Callouts and
        // embeds authored as HTML are styled too.
        rehypeRaw,
        rehypeMessageBox,
        rehypeElementClasses,
        rehypeInternalLinks,
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
    shikiConfig: {
      theme: githubDarkTwoslash,
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: page => page !== `${site}/etc/something-amazing`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
    }),
    sitemapIndexAlias,
  ],
});
