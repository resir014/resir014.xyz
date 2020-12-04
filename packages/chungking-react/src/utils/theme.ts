import { colors, space, fonts, shadows, breakpoints, mediaQueries, typeScale, paragraphScale } from './variables'

export const theme = {
  colors,
  space,
  fonts,
  shadows,
  typeScale,
  paragraphScale,
  breakpoints,
  mediaQueries
}

export type Color = keyof typeof theme['colors']
export type Space = keyof typeof theme['space']
export type TypeScale = keyof typeof theme['typeScale']
export type ParagraphScale = keyof typeof theme['paragraphScale']
