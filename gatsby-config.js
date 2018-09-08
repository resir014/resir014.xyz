'use strict'

require('dotenv').config()

const flavours = require('./gatsby/flavourText')

module.exports = {
  siteMetadata: {
    title: '@resir014',
    description: 'Web developer based in Jakarta, Indonesia.',
    siteUrl: 'https://resir014.xyz',
    flavourText: flavours[Math.floor(Math.random() * flavours.length)],
    author: {
      name: '@resir014',
      description: 'Web developer based in Jakarta, Indonesia.',
      website: 'https://resir014.xyz',
      url: {
        twitter: 'https://twitter.com/resir014',
        mastodon: 'https://icosahedron.website/@resir014',
        instagram: 'https://instagram.com/resir014',
        tumblr: 'https://resir014.tumblr.com/',
        github: 'https://github.com/resir014'
      },
      email: 'resir014@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: '<!-- end -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin: 0;'
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-top: 1rem; margin-bottom: 1rem`
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '›'
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: `https://resir014.xyz`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#fff',
        showSpinner: false
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-plugin-twitter',
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '@resir014',
        short_name: '@resir014',
        start_url: '/',
        background_color: '#0f1126',
        theme_color: '#0f1126',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GA_TRACKING_ID,
        anonymize: true,
        respectDNT: true
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.frontmatter.title || 'New post by @resir014',
                    description: edge.node.fields.lead || edge.node.excerpt,
                    date: edge.node.fields.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ 'content:encoded': edge.node.html }]
                  }
                )
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 10,
                  filter: {
                    fields: {slug: {regex: "/posts/"}}
                  },
                  sort: {fields: [fields___date], order: DESC}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                        lead
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/posts/rss.xml',
            feedTitle: 'All posts by @resir014'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: ['X-Clacks-Overhead: GNU Natalie Nguyen']
      }
    }
  ]
}
