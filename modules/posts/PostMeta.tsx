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
  isMetaClickable?: boolean
}

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, slug, ...rest }) => {
  const postDate = React.useMemo(() => new Date(date), [date])

  const renderPermalink = () => {
    if (slug) {
      return (
        <a className="u-url" href={`${siteMetadata.siteUrl}${slugByCategory(slug, category)}`}>
          Permalink
        </a>
      )
    }

    return null
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
        <Link href={slugByCategory(slug, category)}>
          <a>
            <Text as="time" className="dt-published" dateTime={postDate.toISOString()}>
              {formatPostDate(postDate)}
            </Text>
          </a>
        </Link>{' '}
        /{' '}
        <Link href={getCategorySlug(category)}>
          <a className="p-category">{category}</a>
        </Link>
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
