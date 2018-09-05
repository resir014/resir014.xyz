import * as React from 'react'
import styled from 'react-emotion'

import { getEmSize } from '../../styles/mixins'
import { colors, emSizes, pxSizes } from '../../styles/variables'

interface PageSubtitleProps {
  className?: string
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ className, children }) => {
  return <Section className={className}>{children}</Section>
}

export default PageSubtitle

const Section = styled('section')`
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 4px solid ${colors.ink70};
  border-bottom: 4px solid ${colors.ink70};
  font-size: ${emSizes.headingSmall.h4}rem;
  font-weight: 300;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h4}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h4}rem;
    margin-bottom: 3rem;
  }
`
