import clsx from 'clsx';

export type MessageBoxVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

function getVariantStyles(variant: MessageBoxVariant) {
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
}

/**
 * Resolves the classes of a `MessageBox`. Also used by the Markdown pipeline to style Callouts
 * authored as raw `<div class="message">` HTML.
 */
export function messageBoxClassName(variant: MessageBoxVariant = 'default', className?: string) {
  return clsx(
    'relative p-4 overflow-hidden rounded-md border',
    getVariantStyles(variant),
    'bg-opacity-25',
    className
  );
}
