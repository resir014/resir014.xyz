import * as React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { BlogPostField } from '../../types/fields'
import { Box, BoxProps } from '../chungking-core'
import { PageMetaItem } from '../page'

import PostIndexItemMeta from './PostIndexItemMeta'
import PostIndexItemHeader from './PostIndexItemHeader'
import {
  renderArticleTemplate,
  renderNoteTemplate,
  renderVideoTemplate,
  renderPhotoTemplate,
  renderBookmarkTemplate
} from './templates'

type BlogPostItemProps = BlogPostField &
  BoxProps & {
    isHomepage?: boolean
  }

const BlogPostItem: React.FC<BlogPostItemProps> = ({ node, isHomepage, ...rest }) => {
  const { date, date_ogp, category, slug } = node.fields

  return (
    <Box
      as="article"
      display="flex"
      flexDirection="column"
      position="relative"
      className="h-entry"
      pb={isHomepage ? 0 : 'xxl'}
      borderBottom={isHomepage ? undefined : '1px solid'}
      borderBottomColor={isHomepage ? undefined : 'grey90'}
      css={
        isHomepage
          ? undefined
          : css`
              &:last-of-type {
                padding-bottom: 0;
                border-bottom: none;
              }
            `
      }
      {...rest}
    >
      <PostIndexItemHeader>
        <PostIndexItemMeta>
          <PageMetaItem>
            <Link to={slug}>
              <time className="dt-published" dateTime={new Date(date_ogp).toISOString()}>
                {date}
              </time>
            </Link>
          </PageMetaItem>
          <PageMetaItem className="p-category">{category}</PageMetaItem>
        </PostIndexItemMeta>
      </PostIndexItemHeader>
      {node.fields.category === 'article' && renderArticleTemplate(node, isHomepage)}
      {node.fields.category === 'note' && renderNoteTemplate(node)}
      {node.fields.category === 'video' && renderVideoTemplate(node)}
      {node.fields.category === 'photo' && renderPhotoTemplate(node, isHomepage)}
      {node.fields.category === 'jam' && renderVideoTemplate(node)}
      {node.fields.category === 'bookmark' && renderBookmarkTemplate(node)}
    </Box>
  )
}

export default BlogPostItem
