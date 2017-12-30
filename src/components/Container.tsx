import * as React from 'react'
import styled from 'styled-components'

import { breakpoints, widths } from '../utils/theme'

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
  max-width: ${widths.normal};

  ${breakpoints.lg} {
    max-width: ${widths.large};
  }
`
