import clsx from 'clsx';
import * as React from 'react';

export type BadgeVariants = 'default' | 'minimal';
export type BadgeColorScheme =
  | 'grey'
  | 'red'
  | 'orange'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'ultramarine'
  | 'purple'
  | 'magenta';

export type BadgeSizes = 'md' | 'lg';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: BadgeVariants;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSizes;
}

function getMinimalBadgeColors(colorScheme: BadgeColorScheme = 'grey') {
  switch (colorScheme) {
    case 'blue': {
      return 'text-chungking-blue-400';
    }
    case 'green': {
      return 'text-chungking-green-400';
    }
    case 'grey': {
      return 'text-chungking-white';
    }
    case 'magenta': {
      return 'text-chungking-magenta-400';
    }
    case 'orange': {
      return 'text-chungking-orange-400';
    }
    case 'purple': {
      return 'text-chungking-purple-400';
    }
    case 'red': {
      return 'text-chungking-red-400';
    }
    case 'turquoise': {
      return 'text-chungking-turquoise-400';
    }
    default: {
      return 'text-chungking-white';
    }
  }
}

function getDefaultBadgeColors(colorScheme: BadgeColorScheme = 'grey') {
  switch (colorScheme) {
    case 'blue': {
      return 'text-chungking-grey-100 bg-chungking-blue-500 bg-opacity-25';
    }
    case 'green': {
      return 'text-chungking-grey-100 bg-chungking-green-500 bg-opacity-25';
    }
    case 'grey': {
      return 'text-chungking-grey-100 bg-chungking-grey-500 bg-opacity-25';
    }
    case 'magenta': {
      return 'text-chungking-grey-100 bg-chungking-magenta-500 bg-opacity-25';
    }
    case 'orange': {
      return 'text-chungking-grey-100 bg-chungking-orange-500 bg-opacity-25';
    }
    case 'purple': {
      return 'text-chungking-grey-100 bg-chungking-purple-500 bg-opacity-25';
    }
    case 'red': {
      return 'text-chungking-grey-100 bg-chungking-red-500 bg-opacity-25';
    }
    case 'turquoise': {
      return 'text-chungking-grey-100 bg-chungking-turquoise-500 bg-opacity-25';
    }
    default: {
      return 'text-chungking-grey-100 bg-chungking-grey-500 bg-opacity-25';
    }
  }
}

function getBadgeVariantSizes({
  variant = 'default',
  size = 'md',
}: Pick<BadgeProps, 'variant' | 'size'> = {}) {
  if (variant === 'minimal') {
    return 'py-0.5';
  }

  return size === 'lg' ? 'px-2.5 py-0.5' : 'px-2 py-0.5';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, className, style, variant = 'default', colorScheme = 'grey', size = 'md', ...rest },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center',
          getBadgeVariantSizes({ variant, size }),
          'rounded font-medium',
          size === 'lg' ? 'text-sm' : 'text-xs',
          variant === 'minimal'
            ? getMinimalBadgeColors(colorScheme)
            : getDefaultBadgeColors(colorScheme),
          className
        )}
        style={style}
        {...rest}
      >
        {variant === 'minimal' && (
          <svg
            className={clsx('mr-1.5 h-2 w-2', getMinimalBadgeColors(colorScheme))}
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
