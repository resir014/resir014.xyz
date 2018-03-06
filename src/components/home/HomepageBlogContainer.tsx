import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'
import Container from '../ui/Container'

const StyledHomepageBlogContainer = styled(Container)`
  padding: 1.5rem 0;

  ${media.lg`
    padding: 3rem 0;
  `};
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
