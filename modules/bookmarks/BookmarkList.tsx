import { css } from '@emotion/react'
import * as React from 'react'
import { Stack, StackProps } from '@resir014/chungking-react'
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
        <BookmarkListItem key={bookmark.slug} bookmark={bookmark} />
      ))}
    </Stack>
  )
}

export default BookmarkList
