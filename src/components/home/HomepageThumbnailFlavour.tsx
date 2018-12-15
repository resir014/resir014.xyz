import * as React from 'react'
import styled from 'react-emotion'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import Button from '../ui/Button'

interface HomepageThumbnailFlavourProps {
  className?: string
  title: string
  randomised?: boolean
  flavour?: string
}

const HomepageFlavourTitle = styled('h1')`
  font-size: ${emSizes.headingSmall.h2}rem;
  color: ${colors.grey90};

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

const HomepageFlavourFooter = styled('div')`
  margin-top: 1.5rem;
`

const HomepageThumbnailFlavour: React.SFC<HomepageThumbnailFlavourProps> = ({
  className,
  title,
  flavour
}) => (
  <Div className={className}>
    <HomepageFlavourTitle>{title}</HomepageFlavourTitle>
    {flavour && <HomepageFlavourSub>{flavour}</HomepageFlavourSub>}
    <HomepageFlavourFooter>
      <Button kind="nav-link" color="primary" size="lg" to="/about">
        More about me
      </Button>{' '}
      <Button kind="nav-link" color="primary" size="lg" to="/posts">
        Read my posts
      </Button>
    </HomepageFlavourFooter>
  </Div>
)

export default HomepageThumbnailFlavour

const Div = styled('div')`
  display: flex;
  flex-direction: column;
`
