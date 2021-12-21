import clsx from 'clsx';
import * as React from 'react';

export interface PostProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Post: React.FC<PostProps> = ({ children, className, style }) => {
  return (
    <article className={clsx('h-entry', className)} style={style}>
      {children}
    </article>
  );
};
