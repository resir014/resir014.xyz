/* eslint-disable no-param-reassign */
const withImages = require('next-images')
const flavours = require('./config/flavourText')

const nextConfig = {
  env: {
    FLAVOUR_TEXT: process.env.NEXT_PUBLIC_HOMEPAGE_SPLASH_TEXT || flavours[Math.floor(Math.random() * flavours.length)]
  },
  experimental: {
    productionBrowserSourceMaps: true
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'same-origin'
          }
        ]
      }
    ]
  }
}

module.exports = withImages(nextConfig)
