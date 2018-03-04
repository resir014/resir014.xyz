import * as React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { colors } from '../../styles/variables'
import { media } from '../../styles/mixins'
import { BlogPostField, BlogPostNode } from '../../utils/types'

import Button from '../ui/Button'
import MarkdownContent from '../page/MarkdownContent'
import PostMeta from '../post/PostMeta'
import PostMetaItem from '../post/PostMetaItem'
import BlogPostExcerpt from './BlogPostExcerpt'

const StyledPostItem = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  ${media.lg`
    flex-direction: row;
    margin-bottom: 3rem;
  `}

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledPostMeta = styled(PostMeta)`
  margin-bottom: .5rem;

  ${media.lg`
    margin-bottom: 0;
    width: 20%;
  `}
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
  `}
`

const PostDetailBox = styled.div`
  ${media.lg`
    flex: 1;
  `}
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

class BlogPostItem extends React.Component<BlogPostField, {}> {
  public render() {
    return this.renderPostItem(this.props)
  }

  private renderPostItem(props: BlogPostField) {
    const { node } = props
    const { date, category } = node.fields
    return (
      <StyledPostItem>
        <StyledPostMeta>
          <StyledPostMetaItem><Link to={node.fields.slug}>{date}</Link></StyledPostMetaItem>
          <StyledPostMetaItem>{category}</StyledPostMetaItem>
        </StyledPostMeta>
        {node.fields.category === 'blog' && this.renderArticleTemplate(node)}
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
        <PostTitle>{node.frontmatter.title}</PostTitle>
        {node.fields.lead || node.excerpt ? (
          <BlogPostExcerpt>{node.fields.lead || node.excerpt}</BlogPostExcerpt>
        ) : null}
        <BlogPostFooter>
          <Button kind="nav-link" color="primary" to={node.fields.slug}>Read more</Button>
        </BlogPostFooter>
      </PostDetailBox>
    )
  }

  private renderNoteTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.frontmatter.title && <PostTitle>{node.frontmatter.title}</PostTitle>}
        <MarkdownContent html={node.html} />
      </PostDetailBox>
    )
  }

  private renderBookmarkTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <PostTitle>
          <a href={node.fields.link} target="_blank" rel="noopener noreferrer">
            {node.frontmatter.title}
          </a>{' '}
          &raquo;
        </PostTitle>
        <MarkdownContent html={node.html} />
      </PostDetailBox>
    )
  }
}

export default BlogPostItem
