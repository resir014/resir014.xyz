import * as React from 'react'
import { css } from 'glamor'
import Link from 'gatsby-link'

import { breakpoints, widths, colors } from '../../utils/theme'

import { BlogPostNode } from '../../utils/types'

const blogPostItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  position: 'relative',
  paddingTop: '1rem',
  paddingBottom: '1rem',

  '& .post__title': {
    marginTop: 0
  },

  '& .post__detail-box': {
    '& p': {
      marginTop: 0
    }
  },

  '& .post__footer': {
    marginTop: 'auto'
  },

  '& .post__footer-link': {
    display: 'inline-block',
    marginTop: 'auto',
    padding: '.25rem .5rem',
    border: `2px solid ${colors.neonblue2}`,

    '&:hover, &:focus': {
      color: colors.white,
      borderColor: colors.neonblue3,
      backgroundColor: colors.neonblue3,
      textDecoration: 'none'
    }
  }
})

const BlogPostItem: React.SFC<BlogPostNode> = ({ node }) => (
  <div className={`${blogPostItemClass}`}>
    <h3 className="post__title">
      {node.frontmatter.title}
    </h3>
    <div className="post__detail-box">
      <p>{node.fields.date}</p>
    </div>
    <div className="post__footer">
      <Link className="post__footer-link" to={node.fields.slug}>Read more</Link>
    </div>
  </div>
)

export default BlogPostItem
