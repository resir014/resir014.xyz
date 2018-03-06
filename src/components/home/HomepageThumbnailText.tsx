import * as React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface HomepageThumbnailTextProps {
  className?: string
}

const FlexInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  color: ${darken(0.4, colors.white)};
  background-color: ${colors.ink90};
`

const HomepageThumbnailText: React.SFC<HomepageThumbnailTextProps> = ({ className, children }) => (
  <div className={className}>
    <FlexInner>{children}</FlexInner>
  </div>
)

export default styled(HomepageThumbnailText)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${emSizes.containerPadding}rem;
  user-select: none;
`
