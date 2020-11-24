import * as React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { css } from '@emotion/core'
import convert from 'htmr'

import { Stack, StackProps, Heading } from '@resir014/chungking-core'
import { BasePostProps } from '~/types/posts'
import htmrTransform from '~/lib/htmr-transform'
import PostMeta from '../posts/PostMeta'

export interface PostListItemProps extends StackProps {
  post: BasePostProps
}

const NoteListItem: React.FC<PostListItemProps> = ({ post, className, style, ...rest }) => {
  const { title, date, category, content, slug } = post

  return (
    <Stack
      as="article"
      spacing="lg"
      borderBottom="1px solid"
      borderBottomColor="grey.800"
      pb="xxl"
      className={clsx('h-entry', className)}
      style={style}
      css={css`
        &:last-of-type {
          border-bottom: none;
        }
      `}
      {...rest}
    >
      <Stack as="header" spacing="xs">
        <PostMeta date={date} category={category} slug={slug} />
        {title && (
          <Heading as="h2" variant={800}>
            <Link href="/notes/[...slug]" as={`/notes/${slug}`} passHref>
              <a>{title}</a>
            </Link>
          </Heading>
        )}
      </Stack>
      <Stack as="section" spacing="md">
        {convert(content, { transform: htmrTransform })}
      </Stack>
    </Stack>
  )
}

export default NoteListItem
