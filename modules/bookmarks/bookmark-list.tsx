import * as React from 'react';
import { BookmarkListItem } from './bookmark-list-item';
import { BaseBookmarkProps } from '~/types/posts';

export interface BookmarkListProps extends React.ComponentPropsWithoutRef<'ul'> {
  bookmarks: BaseBookmarkProps[];
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, ...rest }) => {
  return (
    <ul className="space-y-4" {...rest}>
      {bookmarks.map(bookmark => (
        <BookmarkListItem key={bookmark.slug} bookmark={bookmark} />
      ))}
    </ul>
  );
};
