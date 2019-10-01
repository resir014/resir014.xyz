import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { BlogPostNode } from '../../types/nodes'

import { BookmarkLink } from '../bookmark'
import { ResponsiveVideo } from '../video'
import { MarkdownContent } from '../page'
import { NavLinkButton } from '../ui'

import BlogPostExcerpt from './BlogPostExcerpt'
import { Heading } from '../chungking-core'

const PostTitleLink = styled(Link)`
  color: inherit !important;
`

const PostThumbnailImage = styled('img')`
  margin-top: 1.5rem;
  margin-bottom: 0;
`

const PostDetailBox = styled('section')``

const PostTitle: React.FC = ({ children }) => (
  <Heading scale="trafalgar" mt={0} mb="sm">
    {children}
  </Heading>
)

const ResponsiveVideoWrapper = styled(ResponsiveVideo)`
  margin-top: 1.5rem;
`

const PostContent = styled('div')`
  padding: 1.5rem;

  &:last-child {
    padding-bottom: 1.5rem;
  }
`

const BlogPostFooter = styled('div')`
  padding: 0 1.5rem 1.5rem;
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
        <BookmarkLink link={node.fields.link} title={node.frontmatter.title} />
        <MarkdownContent className="e-content" html={node.html} />
      </PostContent>
    </PostDetailBox>
  )
}
