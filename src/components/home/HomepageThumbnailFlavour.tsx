import * as React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface HomepageThumbnailFlavourProps {
  className?: string
  title: string
  flavour: string
}

const HomepageFlavourTitle = styled.span`
  font-size: ${emSizes.headingSmall.h2}rem;
  color: ${colors.white};

  ${media.md`
    font-size: ${emSizes.headingMedium.h2}rem;
  `}

  ${media.lg`
    font-size: ${emSizes.headingLarge.h2}rem;
  `}
`

const HomepageFlavourSub = styled.span`
  font-size: ${emSizes.headingSmall.h4}rem;

  ${media.md`
    margin-left: .5rem;
    font-size: ${emSizes.headingMedium.h2}rem;

    &:before {
      content: "/";
      margin-right: .5rem;
    }
  `}

  ${media.lg`
    font-size: ${emSizes.headingLarge.h2}rem;
  `}
`

const HomepageThumbnailFlavour: React.SFC<HomepageThumbnailFlavourProps> = ({ className, title, flavour }) => (
  <div className={className}>
    <HomepageFlavourTitle>{title}</HomepageFlavourTitle>
    <HomepageFlavourSub>{flavour}</HomepageFlavourSub>
  </div>
)

export default styled(HomepageThumbnailFlavour)`
  display: flex;
  flex-direction: column;

  ${media.md`
    flex-direction: row;
  `}
`
