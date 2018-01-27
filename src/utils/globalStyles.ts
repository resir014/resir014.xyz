import { injectGlobal, css } from 'styled-components'
import { colors, fonts } from './theme'
import mediaQueries from './mediaQueries'

export const createLinkStyle = (color: string = colors.blue60, hoverColor: string = colors.blue70) =>
css`
  color: ${colors.blue60};
  text-decoration: underline;

  &:hover, &:focus {
    color: ${colors.blue70};
  }

  @media ${mediaQueries.md} {
    text-decoration: none;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }
`

export const highlightedText = (
  background: any,
  verticalPad: string | number = 0,
  horizontalPad: string | number = '.5rem'
) => css`{
  margin: 0;
  padding: ${verticalPad} ${horizontalPad};
  background-color: ${background};
  box-decoration-break: clone;
}`

// 1. Negative margin is applied according to the container margin to
//    ensure the content aligns cleanly
// 2. Positive padding on the left side to counter the negative margin for that
//    distinct box effect
// 3. Different right padding for larger screens
export const sectionHeading = (background: any, verticalPad: string | number = 0, horizontalPad: string | number = '.5rem') => css`{
  display: inline-block;
  margin: 0;
  padding: ${verticalPad} ${horizontalPad};
  background-color: ${background};
}`
