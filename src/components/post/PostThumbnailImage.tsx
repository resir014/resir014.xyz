import * as React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PostThumbnailImageProps {
  className?: string
  sizes: { [key: string]: any }
  alt?: string
}

const PostThumbnailImage: React.SFC<PostThumbnailImageProps> = ({ className, sizes, alt }) => (
  <Img
    sizes={sizes}
    alt={alt}
    style={{ background: 'none' }}
  />
)

export default styled(PostThumbnailImage)`
  img {
    margin: 0 auto !important;
    opacity: 0.7 !important;

    @supports(mix-blend-mode: overlay) {
      mix-blend-mode: overlay !important;
      opacity: 1 !important;
    }

    ${media.lg`
      max-height: 30rem;

      @supports (object-fit: cover) {
        width: 100%;
        object-fit: cover;
      }
    `}
  }
`
