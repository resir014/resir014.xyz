import * as React from 'react'
import styled from 'styled-components'

import { media } from '../../styles/mixins'
import { colors, emSizes } from '../../styles/variables'

interface PageSubtitleProps {
  className?: string
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default styled(PageSubtitle)`
  margin: 1.5rem 0 3rem;
  padding: 1rem 0;
  border-top: 4px solid ${colors.ink70};
  border-bottom: 4px solid ${colors.ink70};
  font-size: ${emSizes.headingSmall.h3}rem;
  font-weight: 300;

  ${media.md`
    font-size: ${emSizes.headingMedium.h3}rem;
  `}
`
