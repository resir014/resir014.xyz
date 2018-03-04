import * as React from 'react'
import styled, { css } from 'styled-components'

import { colors, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface BlogPostExcerptProps {
  className?: string
}

const BlogPostExcerpt: React.SFC<BlogPostExcerptProps> = ({ className, children }) => (
  <p className={className}>{children}</p>
)

export default styled(BlogPostExcerpt)`
  font-weight: 300;
  font-size: ${emSizes.headingSmall.h4}rem;

  ${media.md`
    font-size: ${emSizes.headingMedium.h4}rem;
  `}

  ${media.lg`
    font-size: ${emSizes.headingLarge.h4}rem;
  `}
`
