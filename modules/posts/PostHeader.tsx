import * as React from 'react'
import { Box } from '~/components/chungking-core'
import { Container } from '~/components/layout'
import { SiteAuthor } from '~/types/default'
import PostMeta from './PostMeta'
import PostSubtitle from './PostSubtitle'
import PostTitle from './PostTitle'
import { PostHCard } from '.'

interface PostHeaderProps {
  title: string
  lead?: string
  date?: string
  category?: string
  author?: SiteAuthor
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, lead, date, author, category }) => {
  return (
    <Box as="header" pt="xxl" px="lg">
      <Container>
        {date && category && <PostMeta date={date} category={category} mb="md" />}
        <PostTitle>{title}</PostTitle>
        {lead && <PostSubtitle>{lead}</PostSubtitle>}
        {author && <PostHCard author={author} />}
      </Container>
    </Box>
  )
}

export default PostHeader
