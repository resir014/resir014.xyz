import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles/variables'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

export default styled(PageTitle)`
  margin: 0;
  font-weight: 700;
`
