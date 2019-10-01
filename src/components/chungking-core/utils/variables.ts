export const systemFonts =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"

export const fonts = {
  sansSerif: systemFonts,
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace'
}

export const colors = {
  red20: '#ff3333',
  red30: '#ff0000',
  red40: '#e60000',
  orange20: '#f7b955',
  orange30: '#f5a623',
  orange40: '#f49b0b',
  purple20: '#af6aff',
  purple30: '#9b45ff',
  purple40: '#7c37cc',
  blue20: '#1a85ff',
  blue30: '#0076ff',
  blue40: '#0366d6',
  ultramarine20: '#3848d3',
  ultramarine30: '#2234ce',
  ultramarine40: '#1f2fb9',
  magenta20: '#ff369a',
  magenta30: '#ff1493',
  magenta40: '#e60984',
  green20: '#00d28a',
  green30: '#00bf80',
  green40: '#00ac75',
  grey10: '#e8e8e8',
  grey20: '#d0d0d2',
  grey30: '#b9b9bb',
  grey40: '#a2a2a5',
  grey50: '#8b8b8e',
  grey60: '#737377',
  grey70: '#5c5c61',
  grey80: '#45454a',
  grey90: '#2d2d34',
  white: '#ffffff',
  black: '#16161d'
}

/** Space values (in px) mapped by size designators */
export const space = {
  /** Equivalent to 2px */
  xxxs: 2,
  /** Equivalent to 4px */
  xxs: 4,
  /** Equivalent to 8px */
  xs: 8,
  /** Equivalent to 12px */
  sm: 12,
  /** Equivalent to 16px */
  md: 16,
  /** Equivalent to 24px */
  lg: 24,
  /** Equivalent to 32px */
  xl: 32,
  /** Equivalent to 48px */
  xxl: 48
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

/**
 * Typography scaling following BBC's GEL:
 * https://www.bbc.co.uk/gel/guidelines/typography
 */
export const typeScale = {
  canon: {
    sm: {
      fontSize: 32,
      lineHeight: 36
    },
    lg: {
      fontSize: 44,
      lineHeight: 48
    }
  },
  trafalgar: {
    sm: {
      fontSize: 24,
      lineHeight: 28
    },
    lg: {
      fontSize: 32,
      lineHeight: 36
    }
  },
  paragon: {
    sm: {
      fontSize: 22,
      lineHeight: 26
    },
    lg: {
      fontSize: 28,
      lineHeight: 32
    }
  },
  doublePica: {
    sm: {
      fontSize: 20,
      lineHeight: 24
    },
    lg: {
      fontSize: 24,
      lineHeight: 28
    }
  },
  greatPrimer: {
    sm: {
      fontSize: 18,
      lineHeight: 22
    },
    lg: {
      fontSize: 20,
      lineHeight: 24
    }
  },
  body: {
    sm: {
      fontSize: 16,
      lineHeight: 24
    },
    lg: {
      fontSize: 16,
      lineHeight: 24
    }
  },
  pica: {
    sm: {
      fontSize: 16,
      lineHeight: 20
    },
    lg: {
      fontSize: 16,
      lineHeight: 20
    }
  },
  longPrimer: {
    sm: {
      fontSize: 15,
      lineHeight: 18
    },
    lg: {
      fontSize: 14,
      lineHeight: 18
    }
  },
  brevier: {
    sm: {
      fontSize: 14,
      lineHeight: 18
    },
    lg: {
      fontSize: 13,
      lineHeight: 16
    }
  },
  minion: {
    sm: {
      fontSize: 12,
      lineHeight: 16
    },
    lg: {
      fontSize: 12,
      lineHeight: 16
    }
  }
}
