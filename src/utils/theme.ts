export const breakpoints = {
  xs: '@media (min-width: 0)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)'
}

export const widths = {
  normal: '750px',
  large: '970px'
}

export const fonts = {
  sansSerif: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif`,
  serif: `"Zilla Slab", Georgia, "Times New Roman", Times, serif`,
  monospace: `Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
}

export const colors = {
  // Primary colours
  white: '#fff',
  black: '#000',

  // Secondary colours
  blue1: '#33525d',
  blue2: '#558194',
  blue3: '#88d1f1',
  blue4: '#c3e8f8',
  orange1: '#5e4812',
  orange2: '#c89631',
  orange3: '#f8b83e',
  orange4: '#fadb8c',
  red1: '#5d3739',
  red2: '#c07578',
  red3: '#fb8e92',
  red4: '#fdc6c8',
  purple1: '#454653',
  purple2: '#9194b0',
  purple3: '#b0b4e5',
  purple4: '#d7d9f2',
  green1: '#434f12',
  green2: '#6d7c23',
  green3: '#b7d43f',
  green4: '#dbea8e',

  // Tertiary colors
  gray1: '#646363',
  gray2: '#9d9d9c',
  gray3: '#d0d0d0',
  neonblue1: '#3dfefd',
  neonblue2: '#229d9a',
  neonblue3: '#116362',
  neongreen1: '#aefb4a',
  neongreen2: '#6b9b2b',
  neongreen3: '#44611a',
  neonpurple1: '#f793fb',
  neonpurple2: '#ca78cc',
  neonpurple3: '#603861',
  yellow: '#feed01'
}

// Colours for the header background to cycle by random
export const headerColors = [
  {
    gradientStart: colors.neonblue3,
    gradientEnd: colors.neonblue1
  },
  {
    gradientStart: colors.neongreen3,
    gradientEnd: colors.neongreen1
  },
  {
    gradientStart: colors.neonpurple3,
    gradientEnd: colors.neonpurple1
  },
]
