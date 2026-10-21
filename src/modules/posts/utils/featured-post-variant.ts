export type FeaturedPostItemVariants =
  | 'grey'
  | 'red'
  | 'orange'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'ultramarine'
  | 'purple'
  | 'magenta';

export function generateVariantColor(variant: FeaturedPostItemVariants = 'blue') {
  switch (variant) {
    case 'grey': {
      return {
        bg: 'bg-chungking-grey-500',
        border: 'border-chungking-grey-500',
      };
    }
    case 'red': {
      return {
        bg: 'bg-chungking-red-500',
        border: 'border-chungking-red-500',
      };
    }
    case 'orange': {
      return {
        bg: 'bg-chungking-orange-500',
        border: 'border-chungking-orange-500',
      };
    }
    case 'green': {
      return {
        bg: 'bg-chungking-green-500',
        border: 'border-chungking-green-500',
      };
    }
    case 'turquoise': {
      return {
        bg: 'bg-chungking-turquoise-500',
        border: 'border-chungking-turquoise-500',
      };
    }
    case 'blue': {
      return {
        bg: 'bg-chungking-blue-500',
        border: 'border-chungking-blue-500',
      };
    }
    case 'ultramarine': {
      return {
        bg: 'bg-chungking-ultramarine-500',
        border: 'border-chungking-ultramarine-500',
      };
    }
    case 'purple': {
      return {
        bg: 'bg-chungking-purple-500',
        border: 'border-chungking-purple-500',
      };
    }
    case 'magenta': {
      return {
        bg: 'bg-chungking-magenta-500',
        border: 'border-chungking-magenta-500',
      };
    }
    default: {
      return {
        bg: 'bg-chungking-blue-500',
        border: 'border-chungking-blue-500',
      };
    }
  }
}
