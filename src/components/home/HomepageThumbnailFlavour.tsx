import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageThumbnailFlavourProps {
  className?: string
  title: string
  randomised?: boolean
  flavour?: string
}

const HomepageFlavourTitle = styled('h1')`
  font-size: ${emSizes.headingSmall.h2}rem;
  color: ${colors.grey90};
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

const Span = styled('span')`
  a {
    color: ${colors.blue60};

    &:hover,
    &:focus {
      color: ${colors.blue70};
    }
  }
`

const HomepageFlavourFooter = styled('div')`
  margin-top: 1rem;

  ${Span} + ${Span} {
    margin-left: 0.5rem;

    &::before {
      content: '/';
      margin-right: 0.5rem;
    }
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
    <HomepageFlavourFooter>
      <Span>
        <Link to="/about">More about me</Link>
      </Span>
      <Span>
        <Link to="/posts">Read my posts</Link>
      </Span>
    </HomepageFlavourFooter>
  </Div>
)

export default HomepageThumbnailFlavour

const Div = styled('div')`
  display: flex;
  flex-direction: column;
`
