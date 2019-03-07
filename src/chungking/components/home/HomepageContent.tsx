import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledHomepageContent = styled('div')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-top: 3rem;
  }
`

interface HomepageContentProps {
  className?: string
}

const HomepageContent: React.SFC<HomepageContentProps> = ({ children, className }) => (
  <StyledHomepageContent className={className}>{children}</StyledHomepageContent>
)

export default HomepageContent
