import * as React from 'react'
import classnames from 'clsx'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { BlogPostNode } from '../../types/nodes'

import { LiteYouTube } from '../video'
import { MarkdownContent, BookmarkLink } from '../page'

import BlogPostExcerpt from './BlogPostExcerpt'
import { NavLinkButton, Heading, Stack, Box } from '../chungking-core'

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const PostThumbnailImage = styled(Box)`
  margin: 0;
`

const PostDetailBox = styled('section')``

const PostTitle: React.FC = ({ children }) => (
  <Heading variant={800} mt={0} mb="sm">
    {children}
  </Heading>
)

const PostContent = styled(Box)``

const BlogPostFooter = styled('div')`
  padding: 0 24px 24px;
`

export function renderArticleTemplate(node: BlogPostNode): JSX.Element {
  // workaround until this is fixed:
  // https://github.com/gatsbyjs/gatsby/issues/15286
  const renderExcerpt = (excerpt: string) => {
    if (excerpt.length > 141) {
      return `${excerpt.substring(0, 140).trim()}...`
    }

    return excerpt
  }

  return (
    <PostDetailBox>
      {node.frontmatter.header_image && (
        <PostThumbnailImage
          as="img"
          pb={24}
          className="u-featured"
          src={node.frontmatter.header_image.childImageSharp.fluid.src}
          alt={node.frontmatter.title || 'Photo posted by @resir014'}
          srcSet={node.frontmatter.header_image.childImageSharp.fluid.srcSet}
        />
      )}
      <PostContent p={24} pt={0}>
        <PostTitle>
          <PostTitleLink className="p-name" to={node.fields.slug}>
            {node.frontmatter.title}
          </PostTitleLink>
        </PostTitle>
        {node.fields.lead || node.excerpt ? (
          <BlogPostExcerpt className="p-summary">
            {node.fields.lead || renderExcerpt(node.excerpt)}
          </BlogPostExcerpt>
        ) : null}
      </PostContent>
      <BlogPostFooter>
        <NavLinkButton to={node.fields.slug} ghosted>
          Read more &rarr;
        </NavLinkButton>
      </BlogPostFooter>
    </PostDetailBox>
  )
}

export function renderNoteTemplate(node: BlogPostNode): JSX.Element {
  return (
    <PostDetailBox>
      <PostContent p={24} pt={0}>
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
      {node.fields.youtube_embed_id && <LiteYouTube videoId={node.fields.youtube_embed_id} />}
      <PostContent p={24}>
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
      <PostContent p={24}>
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
      <PostContent p={24} pt={0}>
        <Stack spacing="md">
          <BookmarkLink link={node.fields.link} title={node.frontmatter.title} />
          <MarkdownContent className="e-content" html={node.html} />
        </Stack>
      </PostContent>
    </PostDetailBox>
  )
}
