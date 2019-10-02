import * as React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { breakpoints } from '../chungking-core'

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
  min-height: 320px;

  @media (min-width: ${breakpoints.lg}px) {
    max-height: 480px;
  }
`

const Div = styled('div')`
  display: none;

  @media (min-width: ${breakpoints.md}px) {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
`
