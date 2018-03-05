import * as React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PostThumbnailImageProps {
  className?: string
  sizes: { [key: string]: any }
  alt: string
}

const PostThumbnailImage: React.SFC<PostThumbnailImageProps> = ({ sizes, alt, className }) => (
  <Img className={className} sizes={sizes} alt={alt} />
)

export default styled(PostThumbnailImage)`
  margin: 0;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});

  img {
    opacity: 0.7;

    @supports(mix-blend-mode: overlay) {
      mix-blend-mode: overlay;
      opacity: 1;
    }
  }
`
