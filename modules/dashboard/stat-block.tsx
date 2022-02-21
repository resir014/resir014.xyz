import clsx from 'clsx';
import * as React from 'react';
import { ExternalLink } from 'react-feather';

export interface StatBlockProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  count?: number;
  isLoading?: boolean;
  externalLink?: string;
}

export const StatBlock = React.forwardRef<HTMLDivElement, StatBlockProps>(
  ({ className, style, title, count, isLoading, externalLink, ...rest }, ref) => {
    const renderTitle = () => {
      if (externalLink) {
        return (
          <>
            <a
              className="leading-tight helper-link-cover hover:underline"
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
            <ExternalLink size={20} />
          </>
        );
      }

      return <p className="leading-tight">{title}</p>;
    };

    const renderCount = () => {
      if (!count || isLoading) {
        return (
          <div
            className="inline-block rounded-md h-8 sm:h-9 lg:h-10 min-w-[200px] bg-chungking-grey-800"
            aria-hidden
          />
        );
      }

      return (
        <p className="inline-block text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {Intl.NumberFormat('en-GB').format(count)}
        </p>
      );
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'p-4 space-y-2 relative border border-chungking-grey-700 rounded-lg',
          className
        )}
        style={style}
        {...rest}
      >
        <div className="flex items-center space-x-2 text-chungking-grey-200">{renderTitle()}</div>
        <div className="flex items-center">{renderCount()}</div>
      </div>
    );
  }
);

StatBlock.displayName = 'StatBlock';
