import * as React from 'react'
import { css } from 'glamor'

import { sectionHeading, highlightedText } from '../../utils/mixins'
import { colors, headerColors, breakpoints, widths } from '../../utils/theme'

const getBorderColor = headerColors[Math.floor(Math.random() * headerColors.length)].gradientStart

const pageSubtitleClass = css({
  marginTop: '3rem',
  padding: '1rem 0',
  borderTop: `4px solid ${getBorderColor}`,
  borderBottom: `4px solid ${getBorderColor}`,
  fontSize: '1.25rem',
  fontWeight: 300,

  [breakpoints.sm]: {
    width: '75%',
    fontSize: '1.5rem'
  }
})

interface PageSubtitleProps {
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ children }) => {
  return (
    <div className={`${pageSubtitleClass}`}>
      {children}
    </div>
  )
}

export default PageSubtitle
