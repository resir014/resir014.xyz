import * as React from 'react'
import styled from '@emotion/styled'

import { TypeScale, Color } from '../../../Theme'
import { space } from '../../../utils'

import { determineFontDimensions } from '../utils'
import { Typography, TypographyProps } from './Typography'

export interface ParagraphProps extends TypographyProps {
  /** Additional CSS classes to add to the component. */
  className?: string
  /** Additional CSS properties to add to the component. */
  style?: React.CSSProperties
  /** What HTML element to render the text as. */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Size value of the text. */
  scale?: TypeScale
  /** Color value of the text. */
  color?: Color
}

/**
 * This is a base `Text` element to handle typography elements.
 */
const StyledText = styled<typeof Typography, ParagraphProps>(Typography)`
  margin: ${space.md}px 0 ${space.md}px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

/**
 * Heading component provided as a styled component primitive.
 */
export const Paragraph: React.SFC<ParagraphProps> = ({
  children,
  as,
  scale = 'body',
  color,
  ...rest
}) => (
  <StyledText as={as} css={determineFontDimensions(scale)} color={color} {...rest}>
    {children}
  </StyledText>
)

Paragraph.defaultProps = {
  as: 'p'
}

Paragraph.displayName = 'Heading'
