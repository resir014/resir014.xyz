import * as React from 'react'
import { Box } from '~/components/chungking-core'
import { Container } from '~/components/layout'
import { PostKind, SiteAuthor } from '~/types/default'
import PostMeta from './PostMeta'
import PostSubtitle from './PostSubtitle'
import PostTitle from './PostTitle'
import PostHCard from './PostHCard'

interface PostHeaderProps {
  title?: string
  lead?: string
  date?: string
  slug?: string
  isMetaClickable?: boolean
  category?: PostKind
  author?: SiteAuthor
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, lead, date, author, category, slug, isMetaClickable }) => {
  return (
    <Box as="header" pt="xxl" px="lg">
      <Container>
        {date && category && <PostMeta date={date} category={category} mb="md" slug={slug} isMetaClickable={isMetaClickable} />}
        {title && <PostTitle>{title}</PostTitle>}
        {lead && <PostSubtitle>{lead}</PostSubtitle>}
        {author && <PostHCard author={author} />}
      </Container>
    </Box>
  )
}

export default PostHeader
