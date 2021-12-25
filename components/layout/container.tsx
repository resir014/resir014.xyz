import * as React from 'react';
import clsx from 'clsx';

export type ContainerSizes = 'sm' | 'md' | 'lg' | 'xl' | 'fluid';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  style?: React.CSSProperties;
  size?: ContainerSizes;
  children?: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, style, children, size = 'md', ...rest }, ref) => {
    const isMdOrHigher = React.useMemo(
      () => size === 'md' || size === 'lg' || size === 'xl',
      [size]
    );
    const isLgOrHigher = React.useMemo(() => size === 'lg' || size === 'xl', [size]);

    return (
      <div
        ref={ref}
        className={clsx(
          'relative mx-auto max-w-2xl',
          isMdOrHigher && 'md:max-w-3xl',
          isLgOrHigher && 'lg:max-w-4xl',
          size === 'xl' && 'xl:max-w-6xl',
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

Container.displayName = 'Container';
