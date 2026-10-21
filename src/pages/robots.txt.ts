import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.origin;

  return new Response(`# *
User-agent: *
Allow: /

# GPTBot
User-agent: GPTBot
Disallow: /

# Host
Host: ${siteUrl}

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
`);
};
