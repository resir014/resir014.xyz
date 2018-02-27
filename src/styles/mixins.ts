import { css, SimpleInterpolation } from 'styled-components'
import { pxSizes } from './variables'

export const getEmSize = (size: number) => size / pxSizes.fontSize.regular

// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
export const media = {
  sm: (
    styles: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${getEmSize(pxSizes.breakpoints.sm)}em) {
      ${css(styles, ...interpolations)};
    }
  `,
  md: (
    styles: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}em) {
      ${css(styles, ...interpolations)};
    }
  `,
  lg: (
    styles: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}em) {
      ${css(styles, ...interpolations)};
    }
  `,
  xl: (
    styles: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${getEmSize(pxSizes.breakpoints.xl)}em) {
      ${css(styles, ...interpolations)};
    }
  `,
}

// event wrapper
export const onEvent = (self: boolean = false) => (
  styles: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => css`
  ${self && css`
    &,
    &:hover,
    &:focus {
      ${css(styles, ...interpolations)}
    }
  `}

  ${!self && css`
    &:hover,
    &:focus {
      ${css(styles, ...interpolations)}
    }
  `}
`
