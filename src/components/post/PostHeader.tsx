import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'
import Container from '../ui/Container'

interface PostHeaderProps {
  className?: string
  hasImage?: boolean
}

const PostHeader: React.SFC<PostHeaderProps> = ({ className, children }) => (
  <section className={className}>
    <Container size="lg">{children}</Container>
  </section>
)

export default styled(PostHeader)`
  padding: 3rem 1.5rem 0;
  text-align: center;

  ${media.lg`
    font-size: 18px;
  `};
`
