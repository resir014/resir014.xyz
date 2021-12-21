import clsx from 'clsx';
import * as React from 'react';
import { PostListItem } from '.';
import { PostMetadata } from '~/types/posts';

export interface PostListProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  posts: PostMetadata[];
}

export const PostList = React.forwardRef<HTMLDivElement, PostListProps>(
  ({ className, style, title, posts, ...rest }, ref) => {
    return (
      <div ref={ref} className={clsx('space-y-9', className)} style={style} {...rest}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h2>
        <div className="space-y-6">
          {posts.map(post => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  }
);

PostList.displayName = 'PostList';
