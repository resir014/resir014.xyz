import * as React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface PostThumbnailImageProps {
  className?: string
  fluid: any
  alt: string
}

const PostThumbnailImage: React.SFC<PostThumbnailImageProps> = ({ fluid, alt, className }) => (
  <Image className={classnames(className, 'u-featured')} fluid={fluid} alt={alt} />
)

export default PostThumbnailImage

const Image = styled(Img)`
  margin: 0;
  background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});
  z-index: 1;

  img {
    margin: 0;
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

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-height: 560px;
    margin-bottom: -5rem;
  }
`
