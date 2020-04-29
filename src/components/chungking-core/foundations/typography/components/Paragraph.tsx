import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { layout, space as styledSpace, color, typography, variant } from 'styled-system'

import { space, colors, paragraphScale } from '../../../utils'
import { TypographyProps } from './Typography'

export type ParagraphProps = TypographyProps

/**
 * Heading component provided as a styled component primitive.
 */
export const Paragraph = styled<'p', ParagraphProps>('p', {
  shouldForwardProp
})`
  margin: 0 0 ${space.md}px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${colors.green30};
  }

  ${variant({
    prop: 'scale',
    variants: paragraphScale
  })}

  ${layout}
  ${styledSpace}
  ${color}
  ${typography}
`

Paragraph.defaultProps = {
  as: 'p',
  scale: 400
}

Paragraph.displayName = 'Heading'
