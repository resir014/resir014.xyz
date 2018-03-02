import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface PostThumbnailProps {
  className?: string
}

const StyledThumbnail = styled(Container)`
  position: relative;
  height: 30rem;
  margin-top: ${emSizes.containerPadding}rem;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;

    @supports(mix-blend-mode: overlay) {
      mix-blend-mode: overlay;
      opacity: 1;
    }
  }
`

const PostThumbnail: React.SFC<PostThumbnailProps> = ({ className, children }) => (
  <StyledThumbnail size="xl" className={className}>
    {children}
  </StyledThumbnail>
)

export default styled(PostThumbnail)`
  padding: 3rem 1.5rem 0;
  text-align: center;
`
