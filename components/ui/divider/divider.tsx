import * as React from 'react';
import clsx from 'clsx';

export type DividerSizes = 'md' | 'lg';

export interface DividerProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  style?: React.CSSProperties;
  size?: DividerSizes;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, style, size = 'md', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={clsx('flex justify-center', className)}
        style={style}
        {...rest}
      >
        <svg
          className={clsx(size === 'lg' ? 'h-4 w-4' : 'h-2 w-2', 'text-chungking-blue-500')}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
      </div>
    );
  }
);

Divider.displayName = 'Divider';
