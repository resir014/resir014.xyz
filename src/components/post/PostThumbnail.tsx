import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface PostThumbnailProps {
  className?: string
}

const StyledThumbnail = styled(Container)

const PostThumbnail: React.SFC<PostThumbnailProps> = ({ className, children }) => (
  <Container size="xl" className={className}>
    {children}
  </Container>
)

export default styled(PostThumbnail)`
  position: relative;
  margin-top: ${emSizes.containerPadding}rem;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});

  ${media.lg`
    max-height: 30rem;
  `}

  img {
    margin: 0 auto;
    opacity: 0.7;

    @supports(mix-blend-mode: overlay) {
      mix-blend-mode: overlay;
      opacity: 1;
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
