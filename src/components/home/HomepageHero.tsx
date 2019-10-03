import * as React from 'react'
import styled from '@emotion/styled'

import { space, breakpoints, colors } from '../chungking-core'
import Container from '../ui/Container'

import BackgroundPattern from '../../assets/images/architect.svg'

interface HomepageThumbnailProps {
  className?: string
}

const HomepageHero: React.SFC<HomepageThumbnailProps> = ({ className, children }) => (
  <Root className={className}>
    <Inner size="lg">{children}</Inner>
  </Root>
)

export default HomepageHero

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 320px;

  @media (min-width: ${breakpoints.lg}px) {
    padding: 0 ${space.lg}px;
    height: 480px;
  }
`

const Root = styled('header')`
  position: relative;
  margin: 0;
  background: url(${BackgroundPattern});
  height: 320px;
  border-bottom: 1px solid ${colors.grey90};

  @media (min-width: ${breakpoints.lg}px) {
    padding: 0 ${space.lg}px;
    height: 480px;
  }
`
