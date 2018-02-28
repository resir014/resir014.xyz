import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;
`

interface PageProps {
  className?: string
}

const Page: React.SFC<PageProps> = ({ children, className }) => (
  <StyledPage className={className}>{children}</StyledPage>
)

export default Page
