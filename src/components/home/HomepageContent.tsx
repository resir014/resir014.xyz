import * as React from 'react'
import styled from '@emotion/styled'

import { space, breakpoints } from '../chungking-core'

const StyledHomepageContent = styled('div')`
  display: block;
  padding: ${space.lg}px;
  padding-bottom: ${space.xxl}px;

  @media (min-width: ${breakpoints.lg}px) {
    margin-top: ${space.xxl}px;
  }
`

interface HomepageContentProps {
  className?: string
}

const HomepageContent: React.SFC<HomepageContentProps> = ({ children, className }) => (
  <StyledHomepageContent className={className}>{children}</StyledHomepageContent>
)

export default HomepageContent
