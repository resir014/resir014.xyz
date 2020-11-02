import { css } from '@emotion/core'
import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { Box, BoxProps, Text } from '~/components/chungking-core'
import { formatPostDate } from '~/lib/date-formatter'
import { PostKind } from '~/types/default'

export interface PostListItemProps extends BoxProps {
  date: string
  category: PostKind
  slug?: string
  isMetaClickable?: boolean
}

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, slug, ...rest }) => {
  const path = React.useMemo(() => (category === 'note' ? 'notes' : 'posts'), [category])

  const renderPermalink = () => {
    if (slug) {
      return (
        <Link href={slug}>
          <a className="u-url">
            <Text as="time" dateTime={date}>
              {formatPostDate(new Date(date))}
            </Text>
          </a>
        </Link>
      )
    }

    return (
      <Text as="time" dateTime={date}>
        {formatPostDate(new Date(date))}
      </Text>
    )
  }

  const renderMetadata = () => {
    return (
      <Text
        display="block"
        fontFamily="monospace"
        css={css`
          text-transform: uppercase;
        `}
      >
        {renderPermalink()} /{' '}
        <Link href={`/${path}`}>
          <a className="p-category">{category}</a>
        </Link>
      </Text>
    )
  }

  return (
    <Box as="section" className={clsx('h-entry', className)} style={style} {...rest}>
      {renderMetadata()}
    </Box>
  )
}

export default PostMeta
