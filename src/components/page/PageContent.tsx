import * as React from 'react'
import styled from 'react-emotion'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledPageContent = styled('section')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding-top: 3rem;
  }
`

interface PageContentProps {
  className?: string
}

const PageContent: React.SFC<PageContentProps> = ({ children, className }) => (
  <StyledPageContent className={className}>{children}</StyledPageContent>
)

export default PageContent
