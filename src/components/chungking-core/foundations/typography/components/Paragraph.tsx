import * as React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import {
  layout,
  space as styledSpace,
  color,
  typography,
  variant,
  TypographyProps
} from 'styled-system'

import { Color, ParagraphScale } from '../../../Theme'
import { space, colors, paragraphScale } from '../../../utils'

export interface ParagraphProps extends TypographyProps {
  /** Additional CSS classes to add to the component. */
  className?: string
  /** Additional CSS properties to add to the component. */
  style?: React.CSSProperties
  /** What HTML element to render the text as. */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Size value of the text. */
  scale?: ParagraphScale
  /** Color value of the text. */
  color?: Color | string
}

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
