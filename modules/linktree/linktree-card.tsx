import * as React from 'react';
import clsx from 'clsx';
import { LinktreeItem } from '~/lib/data/linktree';

export interface LinktreeCardProps extends React.ComponentPropsWithoutRef<'li'> {
  item: LinktreeItem;
}

export const LinktreeCard = React.forwardRef<HTMLLIElement, LinktreeCardProps>(
  ({ className, style, item, ...rest }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx('relative shadow-lg p-4 rounded-md bg-chungking-grey-800', className)}
        style={{
          ...style,
          backgroundColor: item.backgroundColor ?? undefined,
        }}
        {...rest}
      >
        <a
          className="font-medium text-chungking-white hover:underline helper-link-cover"
          style={{
            color: item.textColor ?? undefined,
          }}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      </li>
    );
  }
);

LinktreeCard.displayName = 'LinkreeCard';

export default LinktreeCard;
