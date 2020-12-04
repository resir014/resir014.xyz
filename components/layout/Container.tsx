import * as React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { mediaQueries, widths } from '@resir014/chungking-react'

export type ContainerSizes = 'md' | 'lg' | 'xl' | 'fluid'

interface ContainerProps {
  className?: string
  size?: ContainerSizes
}

const MediumStyles = css`
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

  ${props.size !== 'fluid' && MediumStyles}
  ${(props.size === 'lg' || props.size === 'xl') && LargeStyles}
  ${props.size === 'xl' && XLargeStyles}
`

const Container: React.FC<ContainerProps> = ({ className, children }) => <div className={className}>{children}</div>

Container.defaultProps = {
  className: undefined,
  size: 'md'
}

export default styled(Container)(ContainerBase)
