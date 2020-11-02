import { css } from '@emotion/core'
import Link from 'next/link'
import * as React from 'react'
import { Box, BoxProps, Text } from '~/components/chungking-core'
import { formatPostDate } from '~/lib/date-formatter'
import { PostKind } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'
import getCategorySlug from './utils/getCategorySlug'
import slugByCategory from './utils/slugByCategory'

export interface PostListItemProps extends BoxProps {
  date: string
  category: PostKind
  slug?: string
  disableMetaClick?: boolean
}

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, slug, disableMetaClick, ...rest }) => {
  const postDate = React.useMemo(() => new Date(date), [date])

  const renderPermalink = () => {
    if (slug) {
      return (
        <a
          css={css`
            display: none;
          `}
          className="u-url"
          href={`${siteMetadata.siteUrl}${slugByCategory(slug, category)}`}
        >
          Permalink
        </a>
      )
    }

    return null
  }

  const renderTimestamp = () => {
    if (disableMetaClick) {
      return (
        <Text as="time" className="dt-published" dateTime={postDate.toISOString()}>
          {formatPostDate(postDate)}
        </Text>
      )
    }

    return (
      <Link href={slugByCategory(slug, category)}>
        <a>
          <Text as="time" className="dt-published" dateTime={postDate.toISOString()}>
            {formatPostDate(postDate)}
          </Text>
        </a>
      </Link>
    )
  }

  const renderCategory = () => {
    if (disableMetaClick) {
      return <Text className="p-category">{category}</Text>
    }

    return (
      <Link href={getCategorySlug(category)}>
        <a className="p-category">{category}</a>
      </Link>
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
        {renderTimestamp()} / {renderCategory()}
      </Text>
    )
  }

  return (
    <Box as="section" className={className} style={style} {...rest}>
      {renderMetadata()}
      {renderPermalink()}
    </Box>
  )
}

export default PostMeta
