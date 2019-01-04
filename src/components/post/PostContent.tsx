import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledPostContent = styled('section')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding-top: 3rem;
  }
`

interface PostContentProps {
  className?: string
  hasHeaderImage?: boolean
}

const PostContent: React.SFC<PostContentProps> = ({ children, className }) => (
  <StyledPostContent className={className}>{children}</StyledPostContent>
)

export default PostContent
