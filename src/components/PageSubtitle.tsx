import * as React from 'react'
import styled from 'styled-components'

import { sectionHeading, highlightedText } from '../utils/mixins'
import { borderColors, widths } from '../utils/theme'
import mediaQueries from '../utils/mediaQueries'

const getBorderColor = borderColors[Math.floor(Math.random() * borderColors.length)]

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
  margin-top: 3rem;
  padding: 1rem 0;
  border-top: 4px solid ${getBorderColor};
  border-bottom: 4px solid ${getBorderColor};
  font-size: 1.25rem;
  font-weight: 300;

  @media ${mediaQueries.sm} {
    width: 75%;
    font-size: 1.5rem;
  }
`
