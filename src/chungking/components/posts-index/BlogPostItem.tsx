import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

import { colors } from '../../styles/variables'
import { BlogPostField } from '../../../types/fields'
import { BlogPostNode } from '../../../types/nodes'

import { BookmarkLink } from '../bookmark'
import { MarkdownContent } from '../page'

import BlogPostExcerpt from '../../../components/postsList/BlogPostExcerpt'
import PostMetaItem from '../../../components/post/PostMetaItem'

const StyledPostItem = styled('article')`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledPostMeta = styled('section')`
  margin-bottom: 1.5rem;
  font-size: 90%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`

const PostMetaHr = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 6px;
  margin: 0.5rem 0;
  border: none;
  border-bottom: 2px solid ${colors.orange30};
`

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const FooterLink = styled(Link)`
  color: ${colors.blue30};
`

const PostThumbnailImage = styled('img')`
  margin-top: 1rem;
  margin-bottom: 1rem;

  &:first-child {
    margin-top: 0;
  }
`

const PostDetailBox = styled('section')``

const PostTitle = styled('h2')`
  margin-top: 0;

  a {
    color: ${colors.blue30};
  }
`

const BlogPostFooter = styled('div')`
  margin-top: 1rem;
`

export class BlogPostItem extends React.Component<BlogPostField, {}> {
  public render() {
    return this.renderPostItem(this.props)
  }

  private renderPostItem(props: BlogPostField) {
    const { node } = props
    const { date, category, slug } = node.fields
    return (
      <StyledPostItem className="h-entry">
        <StyledPostMeta>
          <PostMetaItem>
            <Link to={slug}>
              <time className="dt-published" dateTime={new Date(date).toISOString()}>
                {date}
              </time>
            </Link>
          </PostMetaItem>
          <PostMetaItem className="p-category">{category}</PostMetaItem>
          <PostMetaHr />
        </StyledPostMeta>
        {node.fields.category === 'article' && this.renderArticleTemplate(node)}
        {node.fields.category === 'note' && this.renderNoteTemplate(node)}
        {node.fields.category === 'video' && this.renderNoteTemplate(node)}
        {node.fields.category === 'photo' && this.renderPhotoTemplate(node)}
        {node.fields.category === 'jam' && this.renderNoteTemplate(node)}
        {node.fields.category === 'bookmark' && this.renderBookmarkTemplate(node)}
      </StyledPostItem>
    )
  }

  private renderArticleTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.frontmatter.header_image && (
          <PostThumbnailImage
            className="u-featured"
            src={node.frontmatter.header_image.childImageSharp.fluid.src}
            alt={node.frontmatter.title || 'Photo posted by @resir014'}
            srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
          />
        )}
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
          <PostTitle>
            <PostTitleLink className="p-name" to={node.fields.slug}>
              {node.frontmatter.title}
            </PostTitleLink>
          </PostTitle>
        )}
        <MarkdownContent
          className={classnames('e-content', !node.frontmatter.title && 'p-name')}
          html={node.html}
        />
      </PostDetailBox>
    )
  }

  private renderPhotoTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.frontmatter.title && (
          <PostTitle>
            <PostTitleLink className="p-name" to={node.fields.slug}>
              {node.frontmatter.title}
            </PostTitleLink>
          </PostTitle>
        )}
        {node.frontmatter.header_image && (
          <PostThumbnailImage
            className="u-photo"
            src={node.frontmatter.header_image.childImageSharp.fluid.src}
            alt={node.frontmatter.title || 'Photo posted by @resir014'}
            srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
          />
        )}
        <MarkdownContent
          className={classnames('e-content', !node.frontmatter.title && 'p-name')}
          html={node.html}
        />
      </PostDetailBox>
    )
  }

  private renderBookmarkTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <BookmarkLink inPostList link={node.fields.link} title={node.frontmatter.title} />
        <MarkdownContent className="e-content" html={node.html} />
      </PostDetailBox>
    )
  }
}
