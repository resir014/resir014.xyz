import * as React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'

interface HeaderImageProps {
  className?: string
  sizes: { [key: string]: any }
  alt: string
}

const HeaderImage: React.SFC<HeaderImageProps> = ({ sizes, alt, className }) => (
  <Img className={className} style={{ position: 'absolute' }} sizes={sizes} alt={alt} />
)

export default styled(HeaderImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
  opacity: 0.7;

  @supports(mix-blend-mode: luminosity) {
    mix-blend-mode: luminosity;
    opacity: 1;
  }
`
