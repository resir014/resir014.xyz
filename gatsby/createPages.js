// @ts-check
'use strict'

const path = require('path')

module.exports = async ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators

  // Used to detect and prevent duplicate redirects
  const redirectToSlugMap = {}

  // Redirect old `blog/` directory
  createRedirect({
    fromPath: '/blog/*',
    redirectInBrowser: true,
    toPath: '/article/:splat'
  })

  // Redirect old `posts/` directory
  createRedirect({
    fromPath: '/posts/*',
    redirectInBrowser: true,
    toPath: '/article/:splat'
  })

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                redirect
                slug
                layout
              }
            }
          }
        }
      }
    `
  )

  if (allMarkdown.errors) {
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout, redirect } = node.fields

    createPage({
      path: slug,
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      component: path.resolve(__dirname, `../src/templates/${layout || 'page'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug
      }
    })

    // URL redirect handler
    // Adapted from reactjs/reactjs.org:
    // https://github.com/reactjs/reactjs.org/blob/master/gatsby-node.js#L111
    if (redirect) {
      let toRedirect = JSON.parse(node.fields.redirect)
      if (!Array.isArray(toRedirect)) {
        toRedirect = [toRedirect]
      }

      toRedirect.forEach(fromPath => {
        if (redirectToSlugMap[fromPath] != null) {
          reject(
            `Duplicate redirect detected from "${fromPath}" to:\n` +
              `* ${redirectToSlugMap[fromPath]}\n` +
              `* ${slug}\n`
          )
        }

        // A leading "/" is required for redirects to work,
        // But multiple leading "/" will break redirects.
        // For more context see github.com/reactjs/reactjs.org/pull/194
        const toPath = slug.startsWith('/') ? slug : `/${slug}`

        redirectToSlugMap[fromPath] = slug
        createRedirect({
          fromPath: `/${fromPath}`,
          redirectInBrowser: true,
          toPath
        })
      })
    }
  })
}
