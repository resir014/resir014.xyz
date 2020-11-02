import { css } from '@emotion/core'
import clsx from 'clsx'
import * as React from 'react'
import { Box, BoxProps, Text } from '~/components/chungking-core'
import { formatPostDate } from '~/lib/date-formatter'
import { PostKind } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

export interface PostListItemProps extends BoxProps {
  date: string
  category: PostKind
  slug?: string
  isMetaClickable?: boolean
}

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, slug, ...rest }) => {
  const path = React.useMemo(() => (category === 'note' ? 'notes' : 'posts'), [category])
  const postDate = React.useMemo(() => new Date(date), [date])

  const renderPermalink = () => {
    if (slug) {
      return (
        <a className="u-url" href={`${siteMetadata.siteUrl}/${slug}`}>
          <Text as="time" className="dt-published" dateTime={postDate.toISOString()}>
            {formatPostDate(postDate)}
          </Text>
        </a>
      )
    }

    return (
      <Text as="time" className="dt-published" dateTime={postDate.toISOString()}>
        {formatPostDate(postDate)}
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
        <a className="p-category" href={`${siteMetadata.siteUrl}/${path}/`}>
          {category}
        </a>
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
