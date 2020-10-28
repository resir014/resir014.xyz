import { css } from '@emotion/core'
import * as React from 'react'
import { Anchor, Stack, Text, StackProps } from '~/components/chungking-core'
import { BaseBookmarkProps } from '~/types/posts'

interface BookmarkListItemProps extends StackProps {
  bookmark: BaseBookmarkProps
}

const BookmarkListItem: React.FC<BookmarkListItemProps> = ({ bookmark, ...rest }) => {
  const { title, link } = bookmark

  const parsedURL = React.useMemo(() => new URL(link), [link])

  return (
    <Stack as="li" spacing="xxs" position="relative" {...rest}>
      <Text display="block">
        <Anchor
          href={link}
          target="_blank"
          rel="noopener noreferrer"
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
        </Anchor>
      </Text>{' '}
      <Text display="block">—&nbsp;{parsedURL.host}</Text>
    </Stack>
  )
}

export default BookmarkListItem
