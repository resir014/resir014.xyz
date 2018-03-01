import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles/variables'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <h1 className={className}><span>{children}</span></h1>
)

export default styled(PageTitle)`
  margin: 0;
  text-transform: lowercase;

  span {
    display: inline-block;
    margin: 0;
    padding: .25rem 1.5rem;
    background-color: ${colors.ink90};
    color: ${colors.white};
  }
`
