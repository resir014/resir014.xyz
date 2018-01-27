import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { colors } from '../utils/theme'

import { BlogPostNode } from '../utils/types'
import PostCategory from './PostCategory'
import MarkdownContent from './MarkdownContent'
import mediaQueries, { widths } from '../utils/mediaQueries'

const StyledPostItem = styled.article`
  position: relative;
  border-top: 2px solid ${colors.grey90}
`

const PostDetailBox = styled.div`
  margin: 1.5rem 0;

  @media ${mediaQueries.md} {
    max-width: 85%;
  }

  @media ${mediaQueries.lg} {
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
  color: ${colors.white};
  background-color: ${colors.grey90};
  box-decoration-break: clone;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const StyledPostContent = styled.div`
  margin-top: 1.5rem;
`

const PostTitle = styled.h3`
  margin-top: 0;

  a {
    color: ${colors.blue60};
  }
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
  color: ${colors.blue60};
  border: 2px solid ${colors.blue60};

  &:hover, &:focus {
    color: ${colors.white};
    border-color: ${colors.blue70};
    background-color: ${colors.blue70};
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
          {node.fields.link ? (
            <PostTitle>
              <a
                href={node.fields.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.frontmatter.title} &raquo;
              </a>
            </PostTitle>
          ) : (
            <PostTitle>{node.frontmatter.title}</PostTitle>
          )}
          <MarkdownContent html={node.html} />
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
          {node.fields.lead || node.excerpt ? (
            <BlogPostContent><p>{node.fields.lead || node.excerpt}</p></BlogPostContent>
          ) : null}
          <BlogPostFooter>
            <BlogPostFooterLink to={node.fields.slug}>Read more</BlogPostFooterLink>
          </BlogPostFooter>
        </PostDetailBox>
      </StyledPostItem>
    )
  }
}

export default BlogPostItem
