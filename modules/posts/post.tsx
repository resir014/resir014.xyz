import clsx from 'clsx';
import * as React from 'react';

export interface PostProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Post({ children, className, style }: React.PropsWithChildren<PostProps>) {
  return (
    <article className={clsx('h-entry', className)} style={style}>
      {children}
    </article>
  );
}
