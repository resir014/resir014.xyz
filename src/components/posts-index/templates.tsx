import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { BlogPostNode } from '../../types/nodes'

import { BookmarkLink } from '../bookmark'
import { ResponsiveVideo } from '../video'
import { MarkdownContent } from '../page'

import BlogPostExcerpt from './BlogPostExcerpt'

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
  font-size: ${emSizes.headingMedium.h3}rem;
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

export function renderArticleTemplate(node: BlogPostNode): JSX.Element {
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

export function renderNoteTemplate(node: BlogPostNode): JSX.Element {
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

export function renderVideoTemplate(node: BlogPostNode) {
  return (
    <PostDetailBox>
      {node.fields.youtube_embed_id && (
        <ResponsiveVideoWrapper>
          <iframe
            title={node.fields.youtube_embed_id}
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

export function renderPhotoTemplate(node: BlogPostNode): JSX.Element {
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

export function renderBookmarkTemplate(node: BlogPostNode): JSX.Element {
  return (
    <PostDetailBox>
      <PostContent>
        <BookmarkLink inPostList link={node.fields.link} title={node.frontmatter.title} />
        <MarkdownContent className="e-content" html={node.html} />
      </PostContent>
    </PostDetailBox>
  )
}
