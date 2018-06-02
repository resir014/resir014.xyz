import * as React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

import Container from '../ui/Container'

interface HomepageThumbnailTextProps {
  className?: string
}

const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  max-width: ${getEmSize(pxSizes.widths.lg)};
`

const FlexInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  color: ${darken(0.4, colors.white)};
  background-color: ${colors.grey90};
`

const HomepageThumbnailText: React.SFC<HomepageThumbnailTextProps> = ({ className, children }) => (
  <div className={className}>
    <FlexContainer>
      <FlexInner>{children}</FlexInner>
    </FlexContainer>
  </div>
)

export default styled(HomepageThumbnailText)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem ${emSizes.containerPadding}rem;
  user-select: none;
`
