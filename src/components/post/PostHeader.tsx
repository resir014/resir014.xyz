import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors } from '../../chungking/styles/variables'

interface PostHeaderProps {
  className?: string
  hasImage?: boolean
}

const PostHeader: React.SFC<PostHeaderProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

export default PostHeader

const Section = styled('section')`
  padding: 1.5rem;
  background-color: ${colors.black};
  z-index: 5;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    position: absolute;
    bottom: -5rem;
    font-size: 18px;
    max-width: 85%;
  }
`
