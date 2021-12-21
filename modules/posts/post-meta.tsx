import Link from 'next/link';
import * as React from 'react';
import { slugByCategory } from './utils/slug-by-category';
import { formatPostDate } from '~/lib/date-formatter';
import { PostKind } from '~/types/default';
import siteMetadata from '~/lib/data/site-metadata';

export interface PostMetaProps extends React.ComponentPropsWithoutRef<'section'> {
  date: string;
  category: PostKind;
  slug?: string;
  disableMetaClick?: boolean;
}

export const PostMeta: React.FC<PostMetaProps> = ({
  className,
  style,
  date,
  category,
  slug,
  disableMetaClick,
  ...rest
}) => {
  const postDate = React.useMemo(() => new Date(date), [date]);

  const renderPermalink = () => {
    if (slug) {
      return (
        <a
          className="u-url hidden"
          href={`${siteMetadata.siteUrl}${slugByCategory(slug, category)}`}
        >
          Permalink
        </a>
      );
    }

    return null;
  };

  const renderTimestamp = () => {
    if (disableMetaClick) {
      return (
        <time className="dt-published" dateTime={postDate.toISOString()}>
          {formatPostDate(postDate)}
        </time>
      );
    }

    return (
      <Link href={slugByCategory(slug, category)}>
        <a className="hover:underline">
          <time className="dt-published" dateTime={postDate.toISOString()}>
            {formatPostDate(postDate)}
          </time>
        </a>
      </Link>
    );
  };

  const renderMetadata = () => {
    return (
      <div className="flex space-x-2 items-center">
        <svg className="h-1.5 w-1.5 text-chungking-blue-500" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" />
        </svg>
        <span className="inline-block text-base">{renderTimestamp()}</span>
      </div>
    );
  };

  return (
    <section className={className} style={style} {...rest}>
      {renderMetadata()}
      {renderPermalink()}
    </section>
  );
};
