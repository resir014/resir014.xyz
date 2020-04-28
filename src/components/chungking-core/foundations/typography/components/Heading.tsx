import * as React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { layout, space, color, typography, variant } from 'styled-system'

import { TypeScale, Color } from '../../../Theme'
import { typeScale } from '../../../utils'

import { TypographyProps } from './Typography'

export interface HeadingProps extends TypographyProps {
  /** Additional CSS classes to add to the component. */
  className?: string
  /** Additional CSS properties to add to the component. */
  style?: React.CSSProperties
  /** What HTML element to render the text as. */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Size value of the text. */
  scale?: TypeScale
  /** Color value of the text. */
  color?: Color | string
}

/**
 * This is a base `Text` element to handle typography elements.
 */
const StyledText = styled<'span', HeadingProps>('span', { shouldForwardProp })`
${variant({
  prop: 'scale',
  variants: typeScale
})}

font-weight: 600;

${layout}
${space}
${color}
${typography}
`

/**
 * Heading component provided as a styled component primitive.
 */
export const Heading: React.SFC<HeadingProps> = ({ children, as, ...rest }) => (
  <StyledText as={as} {...rest}>
    {children}
  </StyledText>
)

Heading.defaultProps = {
  as: 'h2',
  scale: 700
}

Heading.displayName = 'Heading'
