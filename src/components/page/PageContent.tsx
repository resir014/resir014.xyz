import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

const StyledPageContent = styled.div`
  display: block;
  padding: 0 ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;
`

interface PageContentProps {
  className?: string
}

const PageContent: React.SFC<PageContentProps> = ({ children, className }) => (
  <StyledPageContent className={className}>{children}</StyledPageContent>
)

export default PageContent
