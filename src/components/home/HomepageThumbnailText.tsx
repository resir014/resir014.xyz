import * as React from 'react'
import styled from 'react-emotion'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageThumbnailTextProps {
  className?: string
}

const FlexContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    text-align: left;
    min-width: 40%;
  }
`

const FlexInner = styled('div')`
  padding: 1.5rem;
  color: ${colors.grey70};
  background-color: ${colors.white};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    width: 100%;
  }
`

const HomepageThumbnailText: React.SFC<HomepageThumbnailTextProps> = ({ className, children }) => (
  <Div className={className}>
    <FlexContainer>
      <FlexInner>{children}</FlexInner>
    </FlexContainer>
  </Div>
)

export default HomepageThumbnailText

const Div = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    top: unset;
    right: unset;
    min-width: 40%;
    max-width: 80%;
  }
`
