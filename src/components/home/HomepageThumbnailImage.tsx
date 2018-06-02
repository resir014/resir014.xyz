import * as React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageThumbnailImageProps {
  className?: string
  sizes: { [key: string]: any }
  alt: string
}

const HomepageThumbnailImage: React.SFC<HomepageThumbnailImageProps> = ({
  sizes,
  alt,
  className
}) => <Img className={className} sizes={sizes} alt={alt} />

export default styled(HomepageThumbnailImage)`
  margin: 0;
  background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});

  ${media.lg`
    max-height: 24rem;
  `} img {
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
