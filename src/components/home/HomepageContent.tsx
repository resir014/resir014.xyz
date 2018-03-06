import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

const StyledHomepageContent = styled.div`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;
`

interface HomepageContentProps {
  className?: string
}

const HomepageContent: React.SFC<HomepageContentProps> = ({
  children,
  className
}) => (
  <StyledHomepageContent className={className}>
    {children}
  </StyledHomepageContent>
)

export default HomepageContent
