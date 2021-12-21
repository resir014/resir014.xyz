import clsx from 'clsx';
import * as React from 'react';
import { FeaturedPostListItem } from './featured-post-list-item';
import { PostMetadata } from '~/types/posts';

export interface FeaturedPostListProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  posts: PostMetadata[];
}

export const FeaturedPostList = React.forwardRef<HTMLDivElement, FeaturedPostListProps>(
  ({ className, style, title, posts, ...rest }, ref) => {
    return (
      <div ref={ref} className={clsx('space-y-9', className)} style={style} {...rest}>
        {title && <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h2>}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {posts.map(post => (
            <FeaturedPostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  }
);

FeaturedPostList.displayName = 'FeaturedPostList';
