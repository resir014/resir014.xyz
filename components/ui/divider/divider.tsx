import * as React from 'react';
import clsx from 'clsx';

export type DividerSizes = 'md' | 'lg';
export type DividerAlignments = 'center' | 'left';

export interface DividerProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  style?: React.CSSProperties;
  size?: DividerSizes;
  align?: DividerAlignments;
}

const DividerDot: React.FC<Pick<DividerProps, 'size'>> = ({ size = 'md' }) => {
  return (
    <svg
      className={clsx(size === 'lg' ? 'h-2 w-2' : 'h-1 w-1', 'text-chungking-blue-500')}
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, style, size = 'md', align = 'center', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={clsx(
          'flex items-center',
          align === 'center' ? 'justify-center' : 'justify-start',
          size === 'lg' ? 'space-x-9' : 'space-x-4',
          className
        )}
        style={style}
        {...rest}
      >
        <DividerDot size={size} />
        <DividerDot size={size} />
        <DividerDot size={size} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';
