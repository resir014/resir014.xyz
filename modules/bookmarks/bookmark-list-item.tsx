import * as React from 'react';
import type { BaseBookmarkProps } from '~/types/posts';

export interface BookmarkListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  bookmark: BaseBookmarkProps;
}

export const BookmarkListItem = React.forwardRef<HTMLLIElement, BookmarkListItemProps>(
  ({ bookmark, ...rest }, ref) => {
    const { title, link } = bookmark;

    const parsedURL = React.useMemo(() => new URL(link), [link]);

    return (
      <li
        ref={ref}
        className="relative shadow-single overflow-hidden rounded-lg bg-chungking-grey-800 bg-gradient-to-r from-chungking-grey-800 to-chungking-grey-700"
        {...rest}
      >
        <h3 className="text-lg lg:text-xl leading-tight px-6 py-3 font-semibold">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group no-underline helper-link-cover text-chungking-turquoise-400"
          >
            <span className="group-hover:underline">{title}</span>&nbsp;&rarr;
          </a>
        </h3>
        <span className="block text-sm px-6 py-2 bg-chungking-black bg-opacity-70">
          {parsedURL.host}
        </span>
      </li>
    );
  }
);

BookmarkListItem.displayName = 'BookmarkListItem';
