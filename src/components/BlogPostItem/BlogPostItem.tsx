import * as React from 'react'
import { StyleSheet, css } from 'glamor/aphrodite'
import { merge } from 'glamor'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { breakpoints, widths, photonColors, sharedStyles } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { BlogPostNode } from '../../utils/types'
import { PostCategory } from '../PostCategory'
import { MarkdownContent } from '../MarkdownContent'

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

      '& .post__date': merge(highlightedText(photonColors.grey90, 0, '.25rem'), {
        color: photonColors.white,

        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      }),

      '& .post__category': merge(highlightedText(photonColors.grey90, 0, '.25rem'), {
        marginLeft: '0.5rem',
        color: photonColors.white
      }),

      '& .post__category--blog': {
        color: photonColors.white,
        backgroundColor: photonColors.teal70
      },

      '& .post__category--bits': {
        color: photonColors.white,
        backgroundColor: photonColors.yellow70
      },

      '& .post__category--tv': {
        color: photonColors.white,
        backgroundColor: photonColors.green70
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

  blogPostContentBits: merge(sharedStyles.markdown, {
    marginTop: '1.5rem'
  }),

  blogPostFooter: {
    '& .post__footer-link': merge(sharedStyles.sectionFooterLink, {
      marginTop: '1rem'
    })
  },
})

const StyledPostItem = styled.article`
  position: relative;
  border-top: 2px solid ${photonColors.grey90}
`

const PostDetailBox = styled.div`
  margin: 1.5rem 0;

  ${breakpoints.md} {
    max-width: 85%;
  }

  ${breakpoints.lg} {
    max-width: 70%;
  }
`

const PostMeta = styled.div`
  margin-top: 0rem;
  margin-bottom: 1rem;
`

const PostMetaDate = styled(Link)`
  display: inline-block;
  margin: 0;
  padding: 0 .25rem;
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};
  box-decoration-break: clone;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const StyledMarkdownContent = styled(MarkdownContent)`
  margin-top: 1.5rem;
`

const PostTitle = styled.h3`
  margin-top: 0;
`

const BlogPostFooter = styled.div`
  margin-top: 1.5rem;
`

const BlogPostFooterLink = styled(Link)`
  display: inline-block;
  margin-top: auto;
  padding: .25rem .5rem;
  color: ${photonColors.blue60};
  border: 2px solid ${photonColors.blue60};

  &:hover, &:focus {
    color: ${photonColors.white};
    border-color: ${photonColors.blue70};
    background-color: ${photonColors.blue70};
    text-decoration: none;
  }
`

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
      <StyledPostItem>
        <PostDetailBox>
          <PostMeta>
            <PostMetaDate to={node.fields.slug}>{date}</PostMetaDate>
            <PostCategory category={category}>{category || 'bits'}</PostCategory>
          </PostMeta>
          <StyledMarkdownContent html={node.html} />
        </PostDetailBox>
      </StyledPostItem>
    )
  }

  private renderBlogItem(props: BlogPostNode) {
    const { node } = props
    const { date, category } = node.fields
    return (
      <StyledPostItem>
        <PostDetailBox>
          <PostMeta>
            <PostMetaDate to={node.fields.slug}>{date}</PostMetaDate>
            <PostCategory category="blog">{category || 'blog'}</PostCategory>
          </PostMeta>
          <PostTitle>{node.frontmatter.title}</PostTitle>
          {node.fields.lead ? <div className={css(styles.blogPostContent)}><p>{node.fields.lead}</p></div> : null}
          <BlogPostFooter>
            <BlogPostFooterLink to={node.fields.slug}>Read more</BlogPostFooterLink>
          </BlogPostFooter>
        </PostDetailBox>
      </StyledPostItem>
    )
  }
}

export default BlogPostItem
