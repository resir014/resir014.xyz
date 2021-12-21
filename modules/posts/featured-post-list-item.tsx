import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { PostMetadata } from '~/types/posts';
import { formatPostDate } from '~/lib/date-formatter';

export interface FeaturedPostListItemProps extends React.ComponentPropsWithoutRef<'article'> {
  post: PostMetadata;
}

export const FeaturedPostListItem: React.FC<FeaturedPostListItemProps> = ({
  post,
  className,
  style,
  ...rest
}) => {
  const { title, lead, date, slug, header_image } = post;
  const postDate = React.useMemo(() => new Date(date), [date]);

  return (
    <article
      className={clsx(
        'h-entry flex flex-col justify-between relative border-4 rounded-xl border-chungking-blue-500 shadow-lg overflow-hidden',
        className
      )}
      style={style}
      {...rest}
    >
      {header_image && (
        <>
          <div role="presentation" className="absolute w-full h-full z-10">
            <Image src={header_image} layout="fill" objectFit="cover" />
          </div>
          <div
            role="presentation"
            className="absolute w-full h-full bg-chungking-blue-500 bg-opacity-50 z-20"
          />
          <div
            role="presentation"
            className="absolute w-full h-full bg-chungking-black bg-opacity-75 z-30"
          />
        </>
      )}
      <div className="flex flex-col justify-between w-full h-full p-4 z-50">
        <div className="space-y-2">
          <time
            className="dt-published text-chungking-grey-400 text-xs lg:text-sm"
            dateTime={postDate.toISOString()}
          >
            {formatPostDate(postDate)}
          </time>
          {title && (
            <h3 className="text-lg lg:text-xl leading-tight">
              <Link href="/posts/[...slug]" as={`/posts/${slug}`}>
                <a className="helper-link-cover font-semibold no-underline">{title}</a>
              </Link>
            </h3>
          )}
          {lead && <p className="text-sm lg:text-base text-chungking-grey-200">{lead}</p>}
        </div>
        <span className="inline-block mt-6">Read more &rarr;</span>
      </div>
    </article>
  );
};
