import * as React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface PostThumbnailImageProps {
  className?: string
  fluid: any
  alt: string
}

export const PageThumbnailImage: React.SFC<PostThumbnailImageProps> = ({
  fluid,
  alt,
  className
}) => <Image className={classnames(className, 'u-featured')} fluid={fluid} alt={alt} />

const Image = styled(Img)`
  margin: 0;
  z-index: 1;

  img {
    margin: 0;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    max-height: 560px;
  }
`
