import * as React from 'react'
import styled from '@emotion/styled'
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps as StyledTypographyProps
} from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { TypeScale, Color } from '../../../utils'

export interface TypographyProps extends LayoutProps, SpaceProps, ColorProps, StyledTypographyProps {
  /** Additional CSS classes to add to the component. */
  className?: string
  /** Additional CSS properties to add to the component. */
  style?: React.CSSProperties
  /** What HTML element to render the text as. */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Size value of the text. */
  variant?: TypeScale
  /** Color value of the text. */
  color?: Color | string
}

/**
 * This is a base `Text` element to handle typography elements.
 */
export const Typography = styled('span', { shouldForwardProp })<TypographyProps>`
  ${layout}
  ${space}
  ${color}
  ${typography}
`

Typography.displayName = 'Typography'
