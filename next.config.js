// @ts-check
const flavours = require('./config/flavour-text');

/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    FLAVOUR_TEXT:
      process.env.NEXT_PUBLIC_HOMEPAGE_SPLASH_TEXT ||
      flavours[Math.floor(Math.random() * flavours.length)],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // https://github.com/vercel/next.js/blob/v13.4.9/packages/next/src/server/config-shared.ts#L147-L300
  experimental: {
    optimizeCss: true,
  },

  // This config won't be loaded until Netlify supports the `headers` option on `next.config.js`.
  // For now, when you make changes here, also make the necessary changes on `netlify.toml`.
  // https://github.com/netlify/netlify-plugin-nextjs/issues/150
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },

  // https://github.com/vercel/next.js/blob/v12.0.7/packages/next/server/config-shared.ts#L111
  productionBrowserSourceMaps: true,

  async redirects() {
    // https://twitter.com/LiamHammett/status/1260984553570570240
    return [
      {
        source: '/.env',
        destination: 'https://www.youtube.com/watch?v=V4MF2s6MLxY',
        permanent: false,
      },
      {
        source: '/wp-login.php',
        destination: 'https://www.youtube.com/watch?v=V4MF2s6MLxY',
        permanent: false,
      },
      {
        source: '/wp-admin',
        destination: 'https://www.youtube.com/watch?v=V4MF2s6MLxY',
        permanent: false,
      },
    ];
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = nextConfig;
