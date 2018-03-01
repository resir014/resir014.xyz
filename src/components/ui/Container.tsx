import * as React from 'react'
import styled, { css } from 'styled-components'

import { media, getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

interface ContainerProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const Container: React.SFC<ContainerProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(Container)`
  margin-left: auto;
  margin-right: auto;

  ${props => props.size !== 'fluid' && css`
    max-width: ${getEmSize(pxSizes.widths.md)};
  `}

  ${props => props.size === 'lg' && media.lg`
    max-width: ${getEmSize(pxSizes.widths.lg)};
  `}

  ${props => props.size === 'xl' && media.xl`
    max-width: ${getEmSize(pxSizes.widths.xl)};
  `}
`
