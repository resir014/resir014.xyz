import * as React from 'react'
import styled from '@emotion/styled'

import { space } from '../chungking-core'

const StyledPageContent = styled('section')`
  display: block;
  padding: ${space.lg}px;
  padding-bottom: 3rem;
`

interface PageContentProps {
  className?: string
}

const PageContent: React.SFC<PageContentProps> = ({ children, className }) => (
  <StyledPageContent className={className}>{children}</StyledPageContent>
)

export default PageContent
