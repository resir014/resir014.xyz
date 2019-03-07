import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface BlogPostExcerptProps {
  className?: string
}

const BlogPostExcerpt: React.SFC<BlogPostExcerptProps> = ({ className, children }) => (
  <Paragraph className={className}>{children}</Paragraph>
)

export default BlogPostExcerpt

const Paragraph = styled('p')`
  font-weight: 300;
  font-size: ${emSizes.headingSmall.h4}rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h4}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h4}rem;
  }
`
