import * as React from 'react'
import styled from '@emotion/styled'

import { space } from '@resir014/chungking-react'

const StyledHomepageContent = styled('main')`
  display: block;
  flex: 1 1 auto;
  padding: 96px ${space.lg}px;
`

interface HomepageContentProps {
  className?: string
}

const HomepageContent: React.FC<HomepageContentProps> = ({ children, className }) => (
  <StyledHomepageContent className={className}>{children}</StyledHomepageContent>
)

export default HomepageContent
