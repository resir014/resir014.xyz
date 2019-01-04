import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'
import Container from '../ui/Container'

const StyledHomepageBlogContainer = styled(Container)`
  padding: 1.5rem 0;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding: 3rem 0;
  }
`

interface HomepageBlogContainerProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const HomepageBlogContainer: React.SFC<HomepageBlogContainerProps> = ({
  children,
  size,
  className
}) => (
  <StyledHomepageBlogContainer className={className} size={size}>
    {children}
  </StyledHomepageBlogContainer>
)

export default HomepageBlogContainer
