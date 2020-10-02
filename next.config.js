const withImages = require('next-images')
const flavours = require('./config/flavourText')

const nextConfig = {
  trailingSlash: true,
  target: 'serverless',
  env: {
    FLAVOUR_TEXT: process.env.GATSBY_HOMEPAGE_SPLASH_TEXT || flavours[Math.floor(Math.random() * flavours.length)]
  }
}

module.exports = withImages(nextConfig)
