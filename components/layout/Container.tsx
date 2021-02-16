import * as React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from '@resir014/chungking-react'

export type ContainerSizes = 'md' | 'lg' | 'xl' | 'fluid'

interface ContainerProps {
  className?: string
  size?: ContainerSizes
}

const MediumStyles = css`
  max-width: ${theme.sizes.containers.md}px;
`

const LargeStyles = css`
  ${theme.mediaQueries.lg} {
    max-width: ${theme.sizes.containers.lg}px;
  }
`

const XLargeStyles = css`
  ${theme.mediaQueries.xl} {
    max-width: ${theme.sizes.containers.xl}px;
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
