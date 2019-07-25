import * as React from 'react'
import styled from '@emotion/styled'

import { colors, pxSizes, emSizes, layerShadows } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageThumbnailTextProps {
  className?: string
  title: string
  flavour?: string
}

const HomepageFlavourTitle = styled('h1')`
  font-size: ${emSizes.headingSmall.h2}rem;
  color: ${colors.white};
  margin-bottom: 0.5rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h1}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h1}rem;
  }
`

const HomepageFlavourSub = styled('span')`
  font-size: ${emSizes.headingSmall.h4}rem;
  font-weight: 300;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h3}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h3}rem;
  }
`

const FlexInner = styled('div')`
  padding: 1.5rem;
  color: ${colors.white};
  background-color: ${colors.black};
  border-radius: 8px;
  box-shadow: ${layerShadows.double};
`

const Div = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const HomepageHeroText: React.SFC<HomepageThumbnailTextProps> = ({ className, title, flavour }) => (
  <Div className={className}>
    <FlexInner>
      <HomepageFlavourTitle>{title}</HomepageFlavourTitle>
      {flavour && <HomepageFlavourSub>{flavour}</HomepageFlavourSub>}
    </FlexInner>
  </Div>
)

export default HomepageHeroText
