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

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, slug, isMetaClickable, ...rest }) => {
  const path = React.useMemo(() => (category === 'note' ? 'notes' : 'posts'), [category])

  const renderPermalink = () => {
    return (
      <Text display="none">
        <a className="u-url" href={`${siteMetadata.siteUrl}/${path}/${slug}`}>
          Permalink
        </a>
      </Text>
    )
  }

  const renderMetadata = () => {
    if (slug && isMetaClickable) {
      return (
        <Text
          display="block"
          fontFamily="monospace"
          css={css`
            text-transform: uppercase;
          `}
        >
          <Text as="time">{formatPostDate(new Date(date))}</Text> / <span className="p-category">{category}</span>
        </Text>
      )
    }

    return (
      <Text
        display="block"
        fontFamily="monospace"
        css={css`
          text-transform: uppercase;
        `}
      >
        <Text as="time">{formatPostDate(new Date(date))}</Text> / <span className="p-category">{category}</span>
      </Text>
    )
  }

  return (
    <Box as="section" className={clsx('h-entry', className)} style={style} {...rest}>
      {renderMetadata()}
      {renderPermalink()}
    </Box>
  )
}

export default PostMeta
