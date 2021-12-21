import clsx from 'clsx';
import * as React from 'react';

export interface MessageBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

export const MessageBox = React.forwardRef<HTMLDivElement, MessageBoxProps>(
  ({ className, children, variant = 'default', ...rest }, ref) => {
    const variantStyles = React.useMemo(() => {
      switch (variant) {
        case 'primary': {
          return 'border-chungking-blue-500 bg-chungking-blue-500';
        }
        case 'success': {
          return 'border-chungking-green-500 bg-chungking-green-500';
        }
        case 'warning': {
          return 'border-chungking-orange-500 bg-chungking-orange-500';
        }
        case 'error': {
          return 'border-chungking-red-500 bg-chungking-red-500';
        }
        default: {
          return 'border-chungking-grey-500 bg-chungking-grey-500';
        }
      }
    }, [variant]);

    return (
      <div
        ref={ref}
        className={clsx(
          'relative p-4 overflow-hidden rounded-md border',
          variantStyles,
          'bg-opacity-25',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

MessageBox.displayName = 'MessageBox';
