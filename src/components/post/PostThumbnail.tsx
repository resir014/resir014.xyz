import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface PostThumbnailProps {
  className?: string
}

const StyledThumbnail = styled(Container)

const PostThumbnail: React.SFC<PostThumbnailProps> = ({
  className,
  children
}) => (
  <Container size="xl" className={className}>
    {children}
  </Container>
)

export default styled(PostThumbnail)`
  margin-top: ${emSizes.containerPadding}rem;

  ${media.lg`
    margin-top: ${emSizes.containerPadding}rem;
  `};
`
