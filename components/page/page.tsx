import * as React from 'react';

export interface PageProps extends React.ComponentPropsWithoutRef<'article'> {
  className?: string;
  style?: React.CSSProperties;
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <article ref={ref} className={className} style={style} {...rest}>
        {children}
      </article>
    );
  }
);

Page.displayName = 'Page';
