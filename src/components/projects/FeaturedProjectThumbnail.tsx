import * as React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { mediaQueries } from '../chungking-core'

interface FeaturedProjectThumbnailProps {
  className?: string
  image: {
    childImageSharp: {
      fluid: any
    }
  }
}

const FeaturedProjectThumbnail: React.FC<FeaturedProjectThumbnailProps> = ({
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
  min-height: 320px;

  ${mediaQueries.lg} {
    max-height: 480px;
  }
`

const Div = styled('div')`
  display: none;

  ${mediaQueries.md} {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
`
