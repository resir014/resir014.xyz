import * as React from 'react'
import classnames from 'clsx'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import slugify from 'slug'

import { BlogPostNode } from '../../types/nodes'

import { LiteYouTube } from '../video'
import { MarkdownContent, BookmarkLink } from '../page'
import { Heading, Stack, Box, Text } from '../chungking-core'

import BlogPostExcerpt from './BlogPostExcerpt'
import PostThumbnailImage from './PostThumbnailImage'

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const PostDetailBox = styled('section')`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

const PostTitle: React.FC = ({ children }) => (
  <Heading variant={800} mt={0} mb="sm">
    {children}
  </Heading>
)

const PostContent = styled(Box)`
  flex: 1 1 auto;
`

const BlogPostFooter = styled(Box)``

export function renderArticleTemplate(node: BlogPostNode, isHomepage = false): JSX.Element {
  // workaround until this is fixed:
  // https://github.com/gatsbyjs/gatsby/issues/15286
  const renderExcerpt = (excerpt: string) => {
    if (excerpt.length > 141) {
      return `${excerpt.substring(0, 140).trim()}...`
    }

    return excerpt
  }

  const readmoreLabel = `read-more-${slugify(node.fields.slug)}`

  return (
    <PostDetailBox>
      {node.frontmatter.header_image && (
        <PostThumbnailImage
          isHomepage={isHomepage}
          className="u-featured"
          src={node.frontmatter.header_image.childImageSharp.fluid.src}
          alt={node.frontmatter.title || 'Post by @resir014'}
          srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
        />
      )}
      <PostContent pb={0} pt="lg">
        <PostTitle>
          <PostTitleLink
            className="p-name"
            to={node.fields.slug}
            aria-describedby={readmoreLabel}
            css={css`
              cursor: pointer;

              &::after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
              }

              &:hover,
              &:focus {
                text-decoration: underline;
              }
            `}
          >
            {node.frontmatter.title}
          </PostTitleLink>
        </PostTitle>
        {node.fields.lead || node.excerpt ? (
          <BlogPostExcerpt className="p-summary">
            {node.fields.lead || renderExcerpt(node.excerpt)}
          </BlogPostExcerpt>
        ) : null}
      </PostContent>
      <BlogPostFooter pt="lg" pb={isHomepage ? 'lg' : 0}>
        <Text id={readmoreLabel} display="inline-block" lineHeight="32px">
          Read more &rarr;
        </Text>
      </BlogPostFooter>
    </PostDetailBox>
  )
}

export function renderNoteTemplate(node: BlogPostNode): JSX.Element {
  return (
    <PostDetailBox>
      <PostContent p={0}>
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
        <LiteYouTube
          videoId={node.fields.youtube_embed_id}
          css={css`
            border-radius: 6px;
          `}
        />
      )}
      <PostContent pt={24}>
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

export function renderPhotoTemplate(node: BlogPostNode, isHomepage = false): JSX.Element {
  return (
    <PostDetailBox>
      {node.frontmatter.header_image && (
        <PostThumbnailImage
          isHomepage={isHomepage}
          className="u-photo"
          src={node.frontmatter.header_image.childImageSharp.fluid.src}
          alt={node.frontmatter.title || 'Photo posted by @resir014'}
          srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
        />
      )}
      <PostContent pt={24}>
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
        <Stack spacing="md">
          <BookmarkLink link={node.fields.link} title={node.frontmatter.title} />
          <MarkdownContent className="e-content" html={node.html} />
        </Stack>
      </PostContent>
    </PostDetailBox>
  )
}
