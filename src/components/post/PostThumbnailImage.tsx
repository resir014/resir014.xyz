import * as React from 'react'
import * as classnames from 'classnames'
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
  <Img className={classnames(className, 'u-featured')} sizes={sizes} alt={alt} />
)

export default styled(PostThumbnailImage)`
  margin: 0;
  background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});

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

  ${media.lg`
    max-height: 30rem;
  `};
`
