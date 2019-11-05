import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { colors, space, fonts, breakpoints, typeScale } from './utils/variables'

export const themeProps = {
  colors,
  space,
  fonts,
  typeScale,
  breakpoints: [
    `${breakpoints.sm}px`,
    `${breakpoints.md}px`,
    `${breakpoints.lg}px`,
    `${breakpoints.xl}px`
  ]
}

export const Theme: React.FC = ({ children }) => {
  return <ThemeProvider theme={themeProps}>{children}</ThemeProvider>
}

export type Color = keyof typeof themeProps['colors']
export type Space = keyof typeof themeProps['space']
export type TypeScale = keyof typeof themeProps['typeScale']
