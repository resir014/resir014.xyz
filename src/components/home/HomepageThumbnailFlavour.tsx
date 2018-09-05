import * as React from 'react'
import styled from 'react-emotion'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageThumbnailFlavourProps {
  className?: string
  title: string
  randomised?: boolean
  flavour?: string
}

const HomepageFlavourTitle = styled('span')`
  font-size: ${emSizes.headingSmall.h2}rem;
  color: ${colors.white};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h2}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h2}rem;
  }
`

const HomepageFlavourSub = styled('span')`
  font-size: ${emSizes.headingSmall.h4}rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    margin-left: 0.5rem;
    font-size: ${emSizes.headingMedium.h2}rem;

    &:before {
      content: '/';
      margin-right: 0.5rem;
    }
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h2}rem;
  }
`

const HomepageThumbnailFlavour: React.SFC<HomepageThumbnailFlavourProps> = ({
  className,
  title,
  flavour
}) => (
  <Div className={className}>
    <HomepageFlavourTitle>{title}</HomepageFlavourTitle>
    {flavour && <HomepageFlavourSub>{flavour}</HomepageFlavourSub>}
  </Div>
)

export default HomepageThumbnailFlavour

const Div = styled('div')`
  display: flex;
  flex-direction: column;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
  }
`
