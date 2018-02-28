import * as React from 'react'
import styled from 'styled-components'

import { media, getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  className?: string
}

const Container: React.SFC<ContainerProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(Container)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: ${getEmSize(pxSizes.widths.md)};

  ${media.lg`
    max-width: ${getEmSize(pxSizes.widths.lg)};
  `}

  ${media.xl`
    max-width: ${getEmSize(pxSizes.widths.xl)};
  `}
`
