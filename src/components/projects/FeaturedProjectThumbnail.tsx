import * as React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors } from '../../styles/variables'

interface FeaturedProjectThumbnailProps {
  className?: string
  image: {
    childImageSharp: {
      fluid: any
    }
  }
}

const FeaturedProjectThumbnail: React.SFC<FeaturedProjectThumbnailProps> = ({
  image,
  className
}) => (
  <Div className={className}>
    <Image fluid={image.childImageSharp.fluid} alt="" />
  </Div>
)

export default FeaturedProjectThumbnail

const Div = styled('div')`
  display: none;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  img {
    margin: 0;
    vertical-align: middle;
    object-fit: cover;
  }
`

const Image = styled(Img)`
  margin: 0;
  background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-height: 400px;
  }

  img {
    opacity: 0.7;

    @supports (mix-blend-mode: multiply) {
      background: ${colors.teal50};
      mix-blend-mode: multiply;
      opacity: 1;

      &:after {
        background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});
        mix-blend-mode: lighten;
      }
    }
  }
`
