'use strict'

const slugify = require('slug')
const { createFilePath } = require('gatsby-source-filesystem')

// Regex to parse date and title from the filename
const BLOG_POST_SLUG_REGEX = /^\/posts\/.+\/([\d]{4})-([\d]{2})-([\d]{2})-(.+)\/$/

module.exports = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const {
      permalink,
      redirect_from,
      category,
      layout,
      lead,
      subtitle,
      link,
      header_image,
      youtube_embed_id,
      date
    } = node.frontmatter
    const relativePath = createFilePath({ node, getNode, basePath: 'pages' })

    let slug = permalink

    if (!slug && relativePath.includes('posts')) {
      // Generate final path + graphql fields for blog posts
      const match = BLOG_POST_SLUG_REGEX.exec(relativePath)
      if (match) {
        const year = match[1]
        const month = match[2]
        const day = match[3]
        const filename = match[4]

        slug = `/posts/${year}/${month}/${day}/${slugify(filename)}/`

        const pubDate = date
          ? new Date(date)
          : new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))

        // Blog posts are sorted by date and display the date in their header.
        createNodeField({
          node,
          name: 'date',
          value: pubDate.toJSON()
        })
      }
    }

    if (!slug && relativePath.includes('projects')) {
      const { tags, year, description, project_url, jumpToProject } = node.frontmatter

      createNodeField({
        node,
        name: 'tags',
        value: tags ? JSON.stringify(tags) : ''
      })

      createNodeField({
        node,
        name: 'year',
        value: year || ''
      })

      createNodeField({
        node,
        name: 'description',
        value: description || ''
      })

      createNodeField({
        node,
        name: 'jumpToProject',
        value: jumpToProject ? JSON.stringify(jumpToProject) : JSON.stringify(false)
      })

      createNodeField({
        node,
        name: 'project_url',
        value: project_url || ''
      })
    }

    if (!slug) {
      slug = relativePath
    }

    // Used to generate URL to view this content.
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })

    // Used to determine a page layout.
    createNodeField({
      node,
      name: 'layout',
      value: layout || ''
    })

    // Used to determine the post category.
    createNodeField({
      node,
      name: 'category',
      value: category || ''
    })

    createNodeField({
      node,
      name: 'link',
      value: link || ''
    })

    // Used to add a lead text.
    createNodeField({
      node,
      name: 'lead',
      value: lead || subtitle || ''
    })

    // Generate an absolute path for a page's header image.
    createNodeField({
      node,
      name: 'headerImage',
      value: header_image || ''
    })

    // Include YT embed id if available
    createNodeField({
      node,
      name: 'youtube_embed_id',
      value: youtube_embed_id || ''
    })

    // Used by createPages() to register redirects.
    createNodeField({
      node,
      name: 'redirect',
      value: redirect_from ? JSON.stringify(redirect_from) : ''
    })
  }
}
