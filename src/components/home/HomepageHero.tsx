import * as React from 'react'
import styled from '@emotion/styled'
import { darken } from 'polished'

import { space, colors, widths } from '../chungking-core'

import BackgroundPattern from '../../assets/images/architect.svg'

interface HomepageThumbnailProps {
  className?: string
}

const HomepageHero: React.FC<HomepageThumbnailProps> = ({ className, children }) => (
  <Root className={className}>
    <Inner>{children}</Inner>
  </Root>
)

export default HomepageHero

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  grid-column: 3/4;
`

const Root = styled('header')`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(auto, ${widths.md}px) 1fr 1fr;
  position: relative;
  margin: 0;
  padding: ${space.xxl}px ${space.lg}px;
  background-color: ${darken(0.05, colors.black)};
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${BackgroundPattern});
  border-bottom: 1px solid ${colors.grey90};
`
