import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { layerShadows } from '../../styles/variables'
import { BlogPostField } from '../../types/fields'
import { PageMetaItem } from '../page'
import { colors } from '../chungking-core'

import PostIndexItemMeta from './PostIndexItemMeta'
import PostIndexItemHeader from './PostIndexItemHeader'
import {
  renderArticleTemplate,
  renderNoteTemplate,
  renderVideoTemplate,
  renderPhotoTemplate,
  renderBookmarkTemplate
} from './templates'

const StyledPostItem = styled('article')`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const BlogPostItem: React.FC<BlogPostField> = ({ node }) => {
  const { date, date_ogp, category, slug } = node.fields

  return (
    <StyledPostItem className="h-entry">
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
          <hr />
        </PostIndexItemMeta>
      </PostIndexItemHeader>
      {node.fields.category === 'article' && renderArticleTemplate(node)}
      {node.fields.category === 'note' && renderNoteTemplate(node)}
      {node.fields.category === 'video' && renderVideoTemplate(node)}
      {node.fields.category === 'photo' && renderPhotoTemplate(node)}
      {node.fields.category === 'jam' && renderVideoTemplate(node)}
      {node.fields.category === 'bookmark' && renderBookmarkTemplate(node)}
    </StyledPostItem>
  )
}

export default BlogPostItem
