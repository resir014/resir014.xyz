import * as React from 'react';

import clsx from 'clsx';

export interface HomepageContentProps extends React.ComponentPropsWithoutRef<'main'> {
  className?: string;
  style?: React.CSSProperties;
}

export const HomepageContent = React.forwardRef<HTMLDivElement, HomepageContentProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <main ref={ref} className={clsx('pt-12 px-6 pb-24', className)} style={style} {...rest}>
        {children}
      </main>
    );
  }
);

HomepageContent.displayName = 'HomepageContent';
