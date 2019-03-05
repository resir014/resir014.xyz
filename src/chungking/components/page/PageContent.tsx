import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes } from '../../styles/variables'

const StyledPageContent = styled('section')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;
`

interface PageContentProps {
  className?: string
}

export const PageContent: React.SFC<PageContentProps> = ({ children, className }) => (
  <StyledPageContent className={className}>{children}</StyledPageContent>
)
