import * as React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { layout, space, color, typography, variant as styledSystemVariant } from 'styled-system'

import { typeScale } from '../../../utils'

import { TypographyProps } from './Typography'

export type HeadingProps = TypographyProps

/**
 * This is a base `Text` element to handle typography elements.
 */
const StyledText = styled<'span', HeadingProps>('span', { shouldForwardProp })`
  ${styledSystemVariant({
    prop: 'variant',
    variants: typeScale
  })}

  ${layout}
  ${space}
  ${color}
  ${typography}
`

/**
 * Heading component provided as a styled component primitive.
 */
const Heading: React.ForwardRefRenderFunction<HTMLElement, HeadingProps> = (
  { children, as = 'h2', fontWeight = 600, variant = 700, ...rest },
  ref
) => (
  <StyledText as={as} ref={ref} fontWeight={fontWeight} variant={variant} {...rest}>
    {children}
  </StyledText>
)

Heading.displayName = 'Heading'

export default React.forwardRef(Heading)
