import * as React from 'react'
import Img from 'gatsby-image'
import styled from 'react-emotion'

interface HeaderImageProps {
  className?: string
  fluid: { [key: string]: any }
  alt: string
}

const HeaderImage: React.SFC<HeaderImageProps> = ({ fluid, alt, className }) => (
  <Image className={className} style={{ position: 'absolute' }} fluid={fluid} alt={alt} />
)

export default HeaderImage

const Image = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
  opacity: 0.7;

  @supports (mix-blend-mode: luminosity) {
    mix-blend-mode: luminosity;
    opacity: 1;
  }
`
