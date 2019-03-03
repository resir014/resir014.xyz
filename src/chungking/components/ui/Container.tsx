import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

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
  max-width: ${pxSizes.widths.md}px;
`

const LargeStyles = css`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-width: ${pxSizes.widths.lg}px;
  }
`

const XLargeStyles = css`
  @media (min-width: ${getEmSize(pxSizes.breakpoints.xl)}) {
    max-width: ${pxSizes.widths.xl}px;
  }
`

const ContainerBase = (props: ContainerProps) => css`
position: relative;
margin-left: auto;
margin-right: auto;

${props.size !== 'fluid' && FluidStyle}
${(props.size === 'lg' || props.size === 'xl') && LargeStyles}
${props.size === 'xl' && XLargeStyles}
`

export default styled(Container)(ContainerBase)
