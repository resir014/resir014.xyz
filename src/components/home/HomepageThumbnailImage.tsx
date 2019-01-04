import * as React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageThumbnailImageProps {
  className?: string
  fluid: any
  alt: string
}

const HomepageThumbnailImage: React.SFC<HomepageThumbnailImageProps> = ({
  fluid,
  alt,
  className
}) => <Image className={className} fluid={fluid} alt={alt} />

export default HomepageThumbnailImage

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
