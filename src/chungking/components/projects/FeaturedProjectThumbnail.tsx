import * as React from 'react'
import styled from '@emotion/styled'
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

export const FeaturedProjectThumbnail: React.SFC<FeaturedProjectThumbnailProps> = ({
  image,
  className
}) => (
  <Div className={className}>
    <Image fluid={image.childImageSharp.fluid} alt="" />
  </Div>
)

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

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-height: 400px;
  }

  img {
    opacity: 0.7;

    @supports (mix-blend-mode: multiply) {
      background: ${colors.blue30};
      mix-blend-mode: multiply;
      opacity: 1;
    }
  }
`
