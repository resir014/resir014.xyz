import * as React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { css } from '@emotion/react'

import { Stack, StackProps, Paragraph } from '@resir014/chungking-react'
import { PostMetadata } from '~/types/posts'
import PostMeta from './PostMeta'

export interface PostListItemProps extends StackProps {
  post: PostMetadata
}

const PostListItem: React.FC<PostListItemProps> = ({ post, className, style, ...rest }) => {
  const { title, lead, date, category, slug } = post

  return (
    <Stack as="article" spacing="xxs" position="relative" className={clsx('h-entry', className)} style={style} {...rest}>
      <PostMeta date={date} category={category} slug={slug} disableMetaClick />
      {title && (
        <h3 className="text-lg sm:text-xl lg:text-2xl leading-tight">
          <Link href="/posts/[...slug]" as={`/posts/${slug}`}>
            <a className="helper-link-cover font-semibold no-underline hover:underline">{title}</a>
          </Link>
        </h3>
      )}
      {lead && <p className="text-sm lg:text-base">{lead}</p>}
    </Stack>
  )
}

export default PostListItem
