import * as React from 'react'
import styled from 'react-emotion'

import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'
import Container from '../ui/Container'

interface PostHeaderProps {
  className?: string
  hasImage?: boolean
}

const PostHeader: React.SFC<PostHeaderProps> = ({ className, children }) => (
  <Section className={className}>
    <Container>{children}</Container>
  </Section>
)

export default PostHeader

const Section = styled('section')`
  padding: 3rem 1.5rem 0;
  text-align: center;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: 18px;
  }
`
