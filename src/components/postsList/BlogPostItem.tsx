import * as React from 'react'
import classnames from 'classnames'
import styled from 'react-emotion'
import { lighten } from 'polished'
import Link from 'gatsby-link'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { BlogPostField } from '../../types/fields'
import { BlogPostNode } from '../../types/nodes'

import MarkdownContent from '../page/MarkdownContent'
import PostMetaItem from '../post/PostMetaItem'
import BlogPostExcerpt from './BlogPostExcerpt'

const StyledPostItem = styled('article')`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    flex-direction: row;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledPostMeta = styled('section')`
  margin-bottom: 0.5rem;
  color: ${lighten(0.5, colors.grey90)};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-bottom: 0;
    width: 20%;
  }
`

const StyledPostMetaItem = styled(PostMetaItem)`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    display: block;

    &:not(:first-of-type) {
      margin-top: 0.25rem;
      margin-left: 0 !important;
    }

    &:before {
      display: none;
    }
  }
`

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const FooterLink = styled(Link)`
  color: ${colors.blue60};

  &:hover,
  &:focus {
    color: ${colors.blue70};
  }
`

const PostThumbnailImage = styled('img')`
  margin-top: 1rem;
  margin-bottom: 1rem;

  &:first-child {
    margin-top: 0;
  }
`

const PostDetailBox = styled('section')`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    flex: 1;
  }
`

const PostTitle = styled('h3')`
  margin-top: 0;

  a {
    color: ${colors.blue60};
  }
`

const BlogPostFooter = styled('div')`
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
        {node.fields.category === 'photo' && this.renderPhotoTemplate(node)}
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
        {node.frontmatter.header_image && (
          <PostThumbnailImage
            className="u-featured"
            src={node.frontmatter.header_image.childImageSharp.fluid.src}
            alt={node.frontmatter.title || 'Photo posted by @resir014'}
            srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
          />
        )}
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
        <PostTitle>
          <a
            className="u-bookmark-of h-cite p-name"
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
