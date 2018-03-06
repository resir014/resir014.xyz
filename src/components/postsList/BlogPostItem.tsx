import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { colors } from '../../styles/variables'
import { media, onEvent } from '../../styles/mixins'
import { BlogPostField, BlogPostNode } from '../../utils/types'

import Button from '../ui/Button'
import MarkdownContent from '../page/MarkdownContent'
import PostMeta from '../post/PostMeta'
import PostMetaItem from '../post/PostMetaItem'
import BlogPostExcerpt from './BlogPostExcerpt'

const StyledPostItem = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  ${media.lg`
    flex-direction: row;
  `} &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledPostMeta = styled(PostMeta)`
  margin-bottom: 0.5rem;

  ${media.lg`
    margin-bottom: 0;
    width: 20%;
  `};
`

const StyledPostMetaItem = styled(PostMetaItem)`
  ${media.lg`
    display: block;

    &:not(:first-of-type) {
      margin-top: .25rem;
      margin-left: 0;
    }

    &:before {
      display: none;
    }
  `};
`

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const FooterLink = styled(Link)`
  color: ${colors.blue60};

  ${onEvent()`
    color: ${colors.blue70};
  `};
`

const PostDetailBox = styled.div`
  ${media.lg`
    flex: 1;
  `};
`

const PostTitle = styled.h3`
  margin-top: 0;
  font-weight: 700;

  a {
    color: ${colors.blue60};
  }
`

const BlogPostFooter = styled.div`
  margin-top: 1rem;
`

class BlogPostItem extends React.Component<BlogPostField, {}> {
  public render() {
    return this.renderPostItem(this.props)
  }

  private renderPostItem(props: BlogPostField) {
    const { node } = props
    const { date, category } = node.fields
    return (
      <StyledPostItem className="h-entry">
        <StyledPostMeta>
          <StyledPostMetaItem>
            <Link to={node.fields.slug}>
              <time className="dt-published" dateTime={new Date(date).toISOString()}>
                {date}
              </time>
            </Link>
          </StyledPostMetaItem>
          <StyledPostMetaItem className="p-category">{category}</StyledPostMetaItem>
        </StyledPostMeta>
        {node.fields.category === 'article' && this.renderArticleTemplate(node)}
        {node.fields.category === 'note' && this.renderNoteTemplate(node)}
        {node.fields.category === 'video' && this.renderNoteTemplate(node)}
        {node.fields.category === 'photo' && this.renderNoteTemplate(node)}
        {node.fields.category === 'jam' && this.renderNoteTemplate(node)}
        {node.fields.category === 'bookmark' && this.renderBookmarkTemplate(node)}
      </StyledPostItem>
    )
  }

  private renderArticleTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <PostTitle>
          <PostTitleLink className="p-name" to={node.fields.slug}>
            {node.frontmatter.title}
          </PostTitleLink>
        </PostTitle>
        {node.fields.lead || node.excerpt ? (
          <BlogPostExcerpt className="p-summary">
            {node.fields.lead || node.excerpt}
          </BlogPostExcerpt>
        ) : null}
        <BlogPostFooter>
          <FooterLink to={node.fields.slug}>Read more &rarr;</FooterLink>
        </BlogPostFooter>
      </PostDetailBox>
    )
  }

  private renderNoteTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.frontmatter.title && (
          <PostTitle className="p-name">{node.frontmatter.title}</PostTitle>
        )}
        <MarkdownContent className="e-content" html={node.html} />
      </PostDetailBox>
    )
  }

  private renderBookmarkTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <PostTitle>
          <a
            className="u-bookmark-of h-cite"
            href={node.fields.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.frontmatter.title}
          </a>{' '}
          &raquo;
        </PostTitle>
        <MarkdownContent className="e-content" html={node.html} />
      </PostDetailBox>
    )
  }
}

export default BlogPostItem
