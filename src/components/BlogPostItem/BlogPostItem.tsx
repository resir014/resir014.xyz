import * as React from 'react'
import { css, merge } from 'glamor'
import Link from 'gatsby-link'

import { breakpoints, widths, colors } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { BlogPostNode } from '../../utils/types'

const blogPostItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  position: 'relative',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',

  '& .post__detail-box': {
    '& .post__meta': {
      marginTop: 0,
      marginBottom: '1rem',

      '& .post__date': merge(highlightedText(colors.black, 0, '.25rem'), {
        color: colors.white
      }),

      '& .post__category': merge(highlightedText(colors.black, 0, '.25rem'), {
        marginLeft: '0.5rem',
        color: colors.white
      }),

      '& .post__category--blog': {
        color: colors.black,
        backgroundColor: colors.blue3
      },

      '& .post__category--bits': {
        color: colors.black,
        backgroundColor: colors.orange3
      }
    },

    '& .post__title': {
      marginTop: 0
    }
  },

  '& .post__content': {
    '& p:last-child': {
      marginBottom: 0
    }
  },

  '& .post__content--bits': {
    marginTop: '1.5rem'
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

    if (node.fields.category === 'bits') {
      return this.renderBitsItem(this.props)
    } else {
      return this.renderBlogItem(this.props)
    }
  }

  private renderBitsItem(props: BlogPostNode) {
    const { node } = props
    return (
      <div className={`${blogPostItemClass}`}>
        <div className="post__detail-box">
          <div className="post__meta">
            <span className="post__date">{node.fields.date}</span>
            <span className="post__category post__category--bits">Bits</span>
          </div>
          <div className="post__content post__content--bits" dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
      </div>
    )
  }

  private renderBlogItem(props: BlogPostNode) {
    const { node } = props
    return (
      <div className={`${blogPostItemClass}`}>
        <div className="post__detail-box">
        <div className="post__meta">
            <span className="post__date">{node.fields.date}</span>
            <span className="post__category post__category--blog">Blog</span>
          </div>
          <h3 className="post__title">{node.frontmatter.title}</h3>
          {node.fields.lead ? <div className="post__content"><p>{node.fields.lead}</p></div> : null}
        </div>
        <div className="post__footer">
          <Link className="post__footer-link" to={node.fields.slug}>Read more</Link>
        </div>
      </div>
    )
  }
}

export default BlogPostItem
