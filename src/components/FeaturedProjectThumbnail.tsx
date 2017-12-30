import * as React from 'react'
import styled, { css } from 'styled-components'

import { breakpoints } from '../../utils/theme'

interface FeaturedProjectThumbnailProps {
  className?: string
  image: string
}

const FeaturedProjectThumbnail: React.SFC<FeaturedProjectThumbnailProps> = ({ image, className }) => (
  <div className={className} />
)

export default styled(FeaturedProjectThumbnail)`
  display: none

  ${breakpoints.md} {
    display: block
  }

  img {
    margin: 0
    verticalAlign: middle
    objectFit: cover
  }

  ${props => props.image && css`
    background-image: url(${props.image});
    background-size: cover;
    background-position-y: center;
  `}
`
