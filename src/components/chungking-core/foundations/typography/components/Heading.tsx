import * as React from 'react'
import styled from '@emotion/styled'

import { TypeScale, Color } from '../../../Theme'

import { determineFontDimensions } from '../utils'
import { Typography, TypographyProps } from './Typography'

export interface Heading extends TypographyProps {
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
const StyledText = styled<typeof Typography, Heading>(Typography)`
  font-weight: 600;
`

/**
 * Heading component provided as a styled component primitive.
 */
export const Heading: React.SFC<Heading> = ({
  children,
  as,
  scale = 'paragon',
  color,
  ...rest
}) => (
  <StyledText as={as} css={determineFontDimensions(scale)} color={color} {...rest}>
    {children}
  </StyledText>
)

Heading.defaultProps = {
  as: 'h2'
}

Heading.displayName = 'Heading'
