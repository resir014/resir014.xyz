import * as React from 'react'
import classnames from 'clsx'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { breakpoints } from '../chungking-core'

interface PostThumbnailImageProps {
  className?: string
  fluid: any
  alt: string
}

const PageThumbnailImage: React.SFC<PostThumbnailImageProps> = ({ fluid, alt, className }) => (
  <Image className={classnames(className, 'u-featured')} fluid={fluid} alt={alt} />
)

export default PageThumbnailImage

const Image = styled(Img)`
  margin: 0;
  z-index: 1;

  img {
    margin: 0;
  }

  @media (min-width: ${breakpoints.lg}px) {
    max-height: 560px;
  }
`
