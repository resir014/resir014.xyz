import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { colors, space, fonts, breakpoints, textSizes } from './utils/variables'

export const themeProps = {
  colors,
  space,
  fonts,
  textSizes,
  breakpoints: [
    `${breakpoints.sm}px`,
    `${breakpoints.md}px`,
    `${breakpoints.lg}px`,
    `${breakpoints.xl}px`
  ]
}

/**
 * Aksara theme provider
 */
export const Theme: React.FC = ({ children }) => {
  return <ThemeProvider theme={themeProps}>{children}</ThemeProvider>
}

export type TextSizes = typeof textSizes
export type Color = keyof typeof themeProps['colors']
export type Space = keyof typeof themeProps['space']
