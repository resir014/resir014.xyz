import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { PostMetadata } from '~/types/posts';
import { formatPostDate } from '~/lib/date-formatter';

export interface PostListItemProps extends React.ComponentPropsWithoutRef<'article'> {
  post: PostMetadata;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post, className, style, ...rest }) => {
  const { title, lead, date, slug } = post;
  const postDate = React.useMemo(() => new Date(date), [date]);

  return (
    <article className={clsx('h-entry relative space-y-1', className)} style={style} {...rest}>
      <time
        className="dt-published text-chungking-grey-400 text-xs lg:text-sm"
        dateTime={postDate.toISOString()}
      >
        {formatPostDate(postDate)}
      </time>
      {title ? (
        <h3 className="text-lg lg:text-xl leading-tight">
          <Link
            href="/posts/[...slug]"
            as={`/posts/${slug}`}
            className="helper-link-cover font-semibold no-underline hover:underline"
          >
            {title}
          </Link>
        </h3>
      ) : null}
      {lead ? <p className="text-sm lg:text-base text-chungking-grey-200">{lead}</p> : null}
    </article>
  );
};
