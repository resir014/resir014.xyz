import { css } from '@emotion/core'
import clsx from 'clsx'
import * as React from 'react'
import { Box, BoxProps, Text } from '~/components/chungking-core'
import { formatPostDate } from '~/lib/date-formatter'

export interface PostListItemProps extends BoxProps {
  date: string
  category: string
}

const PostMeta: React.FC<PostListItemProps> = ({ className, style, date, category, ...rest }) => {
  return (
    <Box as="section" className={clsx('h-entry', className)} style={style} {...rest}>
      <Text
        display="block"
        fontFamily="monospace"
        css={css`
          text-transform: uppercase;
        `}
      >
        {formatPostDate(new Date(date))} / {category}
      </Text>
    </Box>
  )
}

export default PostMeta
