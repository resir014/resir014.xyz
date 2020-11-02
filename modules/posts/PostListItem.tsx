import * as React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'

import { Stack, StackProps, Heading, Paragraph } from '~/components/chungking-core'
import { PostMetadata } from '~/types/posts'
import PostMeta from './PostMeta'

export interface PostListItemProps extends StackProps {
  post: PostMetadata
}

const PostListItem: React.FC<PostListItemProps> = ({ post, className, style, ...rest }) => {
  const { title, lead, date, category, slug } = post

  return (
    <Stack as="article" spacing="xs" position="relative" className={className} style={style} {...rest}>
      <PostMeta date={date} category={category} slug={slug} />
      {title && (
        <Heading as="h2" variant={600}>
          <Link href="/posts/[...slug]" as={`/posts/${slug}`} passHref>
            <a
              css={css`
                &::after {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  right: 0;
                  bottom: 0;
                }
              `}
            >
              {title}
            </a>
          </Link>
        </Heading>
      )}
      {lead && <Paragraph>{lead}</Paragraph>}
    </Stack>
  )
}

export default PostListItem
