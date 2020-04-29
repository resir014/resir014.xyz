import * as React from 'react'
import styled from '@emotion/styled'
import shouldForwardProp from '@styled-system/should-forward-prop'

import { layout, space, color, typography, variant } from 'styled-system'
import { TypeScale, Color } from '../../../Theme'

import { TypographyProps } from './Typography'
import { typeScale } from '../../../utils'

export interface TextProps extends TypographyProps {
  /** What HTML element to render the text as. */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Size value of the text. */
  scale?: TypeScale
  /** Color value of the text. */
  color?: Color | string
}

/**
 * Text component provided as a styled component primitive.
 */
export const Text = styled<'span', TextProps>('span', { shouldForwardProp })`
  ${variant({
    prop: 'scale',
    variants: typeScale
  })}

  ${layout}
  ${space}
  ${color}
  ${typography}
`

Text.defaultProps = {
  as: 'span',
  scale: 400
}

Text.displayName = 'Text'
