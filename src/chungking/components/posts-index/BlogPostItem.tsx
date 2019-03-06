import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'
import Link from 'gatsby-link'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { BlogPostField } from '../../../types/fields'
import { BlogPostNode } from '../../../types/nodes'

import { BookmarkLink } from '../bookmark'
import { MarkdownContent, PageMetaItem } from '../page'
import { ResponsiveVideo } from '../video'

import { BlogPostExcerpt } from './BlogPostExcerpt'
import { PostIndexItemMeta } from './PostIndexItemMeta'
import { PostIndexItemHeader } from './PostIndexItemHeader'

const StyledPostItem = styled('article')`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const FooterLink = styled(Link)`
  color: ${colors.green30};
`

const PostThumbnailImage = styled('img')`
  margin-top: 1.5rem;
  margin-bottom: 0;
`

const PostDetailBox = styled('section')``

const PostTitle = styled('h2')`
  margin-top: 0;

  a {
    color: ${colors.green30};
  }
`

const ResponsiveVideoWrapper = styled(ResponsiveVideo)`
  margin-top: 1.5rem;
`

const VideoTitle = styled(PostTitle)`
  font-size: ${emSizes.headingMedium.h3} rem;
  line-height: ${emSizes.lineHeight.heading};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h3}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h3}rem;
  }
`

const PostContent = styled('div')`
  padding: 1.5rem;

  &:last-child {
    padding-bottom: 1.5rem;
  }
`

const BlogPostFooter = styled('div')`
  margin-top: 1rem;
  padding: 0 1.5rem 1.5rem;
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
        <PostIndexItemHeader>
          <PostIndexItemMeta>
            <PageMetaItem>
              <Link to={slug}>
                <time className="dt-published" dateTime={new Date(date).toISOString()}>
                  {date}
                </time>
              </Link>
            </PageMetaItem>
            <PageMetaItem className="p-category">{category}</PageMetaItem>
            <hr />
          </PostIndexItemMeta>
        </PostIndexItemHeader>
        {node.fields.category === 'article' && this.renderArticleTemplate(node)}
        {node.fields.category === 'note' && this.renderNoteTemplate(node)}
        {node.fields.category === 'video' && this.renderVideoTemplate(node)}
        {node.fields.category === 'photo' && this.renderPhotoTemplate(node)}
        {node.fields.category === 'jam' && this.renderVideoTemplate(node)}
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
        <PostContent>
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
        </PostContent>
        <BlogPostFooter>
          <FooterLink to={node.fields.slug}>Read more &rarr;</FooterLink>
        </BlogPostFooter>
      </PostDetailBox>
    )
  }

  private renderNoteTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <PostContent>
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
        </PostContent>
      </PostDetailBox>
    )
  }

  private renderVideoTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.fields.youtube_embed_id && (
          <ResponsiveVideoWrapper>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${node.fields.youtube_embed_id}?rel=0`}
              allowFullScreen
            />
          </ResponsiveVideoWrapper>
        )}
        <PostContent>
          {node.frontmatter.title && (
            <VideoTitle>
              <PostTitleLink className="p-name" to={node.fields.slug}>
                {node.frontmatter.title}
              </PostTitleLink>
            </VideoTitle>
          )}
          <MarkdownContent
            className={classnames('e-content', !node.frontmatter.title && 'p-name')}
            html={node.html}
          />
        </PostContent>
      </PostDetailBox>
    )
  }

  private renderPhotoTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        {node.frontmatter.header_image && (
          <PostThumbnailImage
            className="u-photo"
            src={node.frontmatter.header_image.childImageSharp.fluid.src}
            alt={node.frontmatter.title || 'Photo posted by @resir014'}
            srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
          />
        )}
        <PostContent>
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
        </PostContent>
      </PostDetailBox>
    )
  }

  private renderBookmarkTemplate(node: BlogPostNode) {
    return (
      <PostDetailBox>
        <PostContent>
          <BookmarkLink inPostList link={node.fields.link} title={node.frontmatter.title} />
          <MarkdownContent className="e-content" html={node.html} />
        </PostContent>
      </PostDetailBox>
    )
  }
}
