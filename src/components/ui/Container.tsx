import * as React from 'react'
import styled, { css } from 'react-emotion'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

interface ContainerProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const Container: React.SFC<ContainerProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

const FluidStyle = css`
  max-width: ${getEmSize(pxSizes.widths.md)};
`

const LargeStyles = css`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-width: ${getEmSize(pxSizes.widths.lg)};
  }
`

const XLargeStyles = css`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.xl)}) {
    max-width: ${getEmSize(pxSizes.widths.xl)};
  }
`

const ContainerBase = (props: ContainerProps) => css`
margin-left: auto;
margin-right: auto;

${props.size !== 'fluid' && FluidStyle}
${(props.size === 'lg' || props.size === 'xl') && LargeStyles}
${props.size === 'xl' && XLargeStyles}
`

export default styled(Container)(ContainerBase)
