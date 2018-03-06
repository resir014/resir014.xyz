import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'

const StyledPage = styled.main`
  display: block;
  flex: 1;
  position: relative;
  padding: 0;
`

interface PageProps {
  className?: string
}

const Page: React.SFC<PageProps> = ({ children, className }) => (
  <StyledPage className={className}>{children}</StyledPage>
)

export default Page
