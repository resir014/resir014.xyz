import clsx from 'clsx';
import * as React from 'react';

export type LayoutRootProps = React.ComponentPropsWithoutRef<'div'>;

export const LayoutRoot = React.forwardRef<HTMLDivElement, LayoutRootProps>(
  ({ children, className, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-col w-full h-full min-h-screen relative p-0 bg-chungking-grey-900 text-chungking-white',
          className
        )}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

LayoutRoot.displayName = 'LayoutRoot';
