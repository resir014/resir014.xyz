import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { formatPostDate } from '~/lib/date-formatter';

export interface PostDateProps extends React.ComponentPropsWithoutRef<'div'> {
  href?: string;
  date: string;
}

export const PostDate: React.FC<PostDateProps> = ({ className, style, date, href, ...rest }) => {
  const postDate = React.useMemo(() => new Date(date), [date]);

  const renderTimestamp = () => {
    if (href) {
      return (
        <Link href={href}>
          <a className="hover:underline">
            <time className="dt-published" dateTime={postDate.toISOString()}>
              {formatPostDate(postDate)}
            </time>
          </a>
        </Link>
      );
    }

    return (
      <time className="dt-published" dateTime={postDate.toISOString()}>
        {formatPostDate(postDate)}
      </time>
    );
  };

  return (
    <div className={clsx('flex space-x-2 items-center', className)} style={style} {...rest}>
      <svg className="h-1.5 w-1.5 text-chungking-blue-500" fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" />
      </svg>
      <span className="inline-block text-base">{renderTimestamp()}</span>
    </div>
  );
};
