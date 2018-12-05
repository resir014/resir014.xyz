import * as React from 'react'
import styled from 'react-emotion'
import Img from 'gatsby-image'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

interface FeaturedProjectThumbnailProps {
  className?: string
  image: {
    childImageSharp: {
      fluid: { [key: string]: any }
    }
  }
}

const FeaturedProjectThumbnail: React.SFC<FeaturedProjectThumbnailProps> = ({
  image,
  className
}) => (
  <Div className={className}>
    <Img fluid={image.childImageSharp.fluid} alt="" />
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
