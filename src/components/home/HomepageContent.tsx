import * as React from 'react'
import styled from '@emotion/styled'

import { space, mediaQueries } from '../chungking-core'

const StyledHomepageContent = styled('div')`
  display: block;
  padding: ${space.lg}px;
  padding-bottom: ${space.xxl}px;

  ${mediaQueries.lg} {
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
