import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { mediaQueries, widths } from '../chungking-core'

interface ContainerProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const Container: React.SFC<ContainerProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

Container.defaultProps = {
  className: undefined,
  size: 'md'
}

const FluidStyle = css`
  max-width: ${widths.md}px;
`

const LargeStyles = css`
  ${mediaQueries.lg} {
    max-width: ${widths.lg}px;
  }
`

const XLargeStyles = css`
  ${mediaQueries.xl} {
    max-width: ${widths.xl}px;
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
