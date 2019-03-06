import * as React from 'react'
import styled from '@emotion/styled'

import Container from '../ui/Container'
import { getEmSize } from '../../styles/mixins'
import { pxSizes, emSizes } from '../../styles/variables'

interface HomepageThumbnailProps {
  className?: string
}

export const HomepageHero: React.SFC<HomepageThumbnailProps> = ({ className, children }) => (
  <Root className={className}>
    <Inner size="lg">{children}</Inner>
  </Root>
)

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 320px;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding: 0 ${emSizes.containerPadding}rem;
    height: 480px;
  }
`

const Root = styled('div')`
  position: relative;
  margin: 0;
  background: url(${require('../../../assets/images/architect.svg')}) repeat center center;
  height: 320px;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding: 0 ${emSizes.containerPadding}rem;
    height: 480px;
  }
`
