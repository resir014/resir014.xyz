import * as React from 'react'
import styled from '@emotion/styled'

import { Text, TextProps } from './Text'
import { colors, mediaQueries } from '../../../utils'

export type AnchorProps = TextProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

const AnchorBase = styled(Text)`
  color: ${colors.turquoise[400]};
  text-decoration: underline;

  strong {
    color: inherit;
  }

  ${mediaQueries.md} {
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

/**
 * Anchor component provided as a styled component primitive.
 */
const Anchor: React.ForwardRefRenderFunction<HTMLAnchorElement, AnchorProps> = ({ children, className, style, ...rest }, ref) => {
  return (
    <AnchorBase as="a" ref={ref} className={className} style={style} {...rest}>
      {children}
    </AnchorBase>
  )
}

Anchor.displayName = 'Anchor'

export default React.forwardRef(Anchor)
