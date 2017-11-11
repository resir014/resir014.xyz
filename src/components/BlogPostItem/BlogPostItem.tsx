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

  '& .post__detail-box': {
    '& .post__meta': {
      marginTop: 0,
      marginBottom: '1rem'
    },

    '& .post__title': {
      marginTop: 0
    }
  },

  '& .post__footer': {
    marginTop: 'auto'
  },

  '& .post__footer-link': {
    display: 'inline-block',
    marginTop: '1rem',
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

class BlogPostItem extends React.Component<BlogPostNode, {}> {
  public render() {
    const { node } = this.props

    return this.renderBlogItem(this.props)
  }

  private renderBlogItem(props: BlogPostNode) {
    const { node } = props
    return (
      <div className={`${blogPostItemClass}`}>
        <div className="post__detail-box">
          <div className="post__meta">{node.fields.date}</div>
          <h3 className="post__title">{node.frontmatter.title}</h3>
          {node.fields.lead ? <p>{node.fields.lead}</p> : null}
        </div>
        <div className="post__footer">
          <Link className="post__footer-link" to={node.fields.slug}>Read more</Link>
        </div>
      </div>
    )
  }
}

export default BlogPostItem
