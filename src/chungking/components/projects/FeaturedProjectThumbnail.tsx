import * as React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

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

const Image = styled(Img)`
  margin: 0;
  height: 100%;
  min-height: 300px;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-height: 400px;
  }
`

const Div = styled('div')`
  display: none;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
`
