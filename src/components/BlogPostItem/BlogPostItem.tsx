import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { breakpoints, widths, photonColors, sharedStyles } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { BlogPostNode } from '../../utils/types'
import { PostCategory } from '../PostCategory'
import { MarkdownContent } from '../MarkdownContent'

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

const BlogPostContent = styled.div`
  p:last-child {
    margin-bottom: 0;
  }
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
          {node.fields.lead ? <BlogPostContent><p>{node.fields.lead}</p></BlogPostContent> : null}
          <BlogPostFooter>
            <BlogPostFooterLink to={node.fields.slug}>Read more</BlogPostFooterLink>
          </BlogPostFooter>
        </PostDetailBox>
      </StyledPostItem>
    )
  }
}

export default BlogPostItem
