import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

import Container from '../ui/Container'

const StyledHomepageLanguageList = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    flex-direction: row;
  }
`

interface HomepageLanguageListProps {
  className?: string
}

const HomepageLanguageList: React.SFC<HomepageLanguageListProps> = ({ className, children }) => (
  <StyledHomepageLanguageList className={className} size="lg">
    {children}
  </StyledHomepageLanguageList>
)

export default HomepageLanguageList
