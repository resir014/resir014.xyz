import { css } from '@emotion/core'
import * as React from 'react'
import { Stack, StackProps } from '~/components/chungking-core'
import { BaseBookmarkProps } from '~/types/posts'
import BookmarkListItem from './BookmarkListItem'

interface BookmarkListProps extends StackProps {
  bookmarks: BaseBookmarkProps[]
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, ...rest }) => {
  return (
    <Stack
      as="ul"
      spacing="md"
      p={0}
      m={0}
      css={css`
        list-style-type: none;
      `}
      {...rest}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkListItem bookmark={bookmark} />
      ))}
    </Stack>
  )
}

export default BookmarkList
