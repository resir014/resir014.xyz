import * as React from 'react'
import { StyleSheet, css } from 'glamor/aphrodite'
import { merge } from 'glamor'
import Link from 'gatsby-link'

import { breakpoints, widths, colors } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { BlogPostNode } from '../../utils/types'

const styles = StyleSheet.create({
  blogPostItem: {
    position: 'relative',
  },

  blogPostDetailBox: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',

    [breakpoints.md]: {
      maxWidth: '85%'
    },

    [breakpoints.lg]: {
      maxWidth: '70%'
    },

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
      },

      '& .post__category--tv': {
        color: colors.black,
        backgroundColor: colors.green3
      }
    },

    '& .post__title': {
      marginTop: 0
    }
  },

  blogPostContent: {
    '& p:last-child': {
      marginBottom: 0
    }
  },

  blogPostContentBits: {
    marginTop: '1.5rem'
  },

  blogPostFooter: {
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
  },
})

class BlogPostItem extends React.Component<BlogPostNode, {}> {
  public render() {
    const { node } = this.props

    if (node.fields.category === 'blog') {
      return this.renderBlogItem(this.props)
    } else {
      return this.renderBitsItem(this.props)
    }
  }

  private renderBitsItem(props: BlogPostNode) {
    const { node } = props
    const { date, category } = node.fields
    return (
      <div className={css(styles.blogPostItem)}>
        <div className={css(styles.blogPostDetailBox)}>
          <div className="post__meta">
            <span className="post__date">{date}</span>
            <span className={`post__category ${category ? `post__category--${category}` : null}`}>
              {category || 'bits'}
            </span>
          </div>
          <div className={css(styles.blogPostContentBits)} dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
      </div>
    )
  }

  private renderBlogItem(props: BlogPostNode) {
    const { node } = props
    return (
      <div className={css(styles.blogPostItem)}>
        <div className={css(styles.blogPostDetailBox)}>
          <div className="post__meta">
            <span className="post__date">{node.fields.date}</span>
            <span className="post__category post__category--blog">blog</span>
          </div>
          <h3 className="post__title">{node.frontmatter.title}</h3>
          {node.fields.lead ? <div className={css(styles.blogPostContent)}><p>{node.fields.lead}</p></div> : null}
          <div className={css(styles.blogPostFooter)}>
            <Link className="post__footer-link" to={node.fields.slug}>Read more</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostItem
