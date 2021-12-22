import * as React from 'react';

export type PageMetaItemProps = React.ComponentPropsWithoutRef<'div'>;

export const PageMetaItem = React.forwardRef<HTMLDivElement, PageMetaItemProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="inline-flex space-x-2 items-center">
        <svg className="h-1.5 w-1.5 text-chungking-blue-500" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" />
        </svg>
        <span className="inline-block text-base">{children}</span>
      </div>
    );
  }
);

PageMetaItem.displayName = 'PageMetaItem';
