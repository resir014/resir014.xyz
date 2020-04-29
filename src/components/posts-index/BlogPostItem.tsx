import * as React from 'react'
import { Link } from 'gatsby'

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

type BlogPostItemProps = BlogPostField & BoxProps

const BlogPostItem: React.FC<BlogPostItemProps> = ({ node, ...rest }) => {
  const { date, date_ogp, category, slug } = node.fields

  return (
    <Box
      as="article"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      backgroundColor="grey90"
      boxShadow="single"
      borderRadius={6}
      className="h-entry"
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
      {node.fields.category === 'article' && renderArticleTemplate(node)}
      {node.fields.category === 'note' && renderNoteTemplate(node)}
      {node.fields.category === 'video' && renderVideoTemplate(node)}
      {node.fields.category === 'photo' && renderPhotoTemplate(node)}
      {node.fields.category === 'jam' && renderVideoTemplate(node)}
      {node.fields.category === 'bookmark' && renderBookmarkTemplate(node)}
    </Box>
  )
}

export default BlogPostItem
