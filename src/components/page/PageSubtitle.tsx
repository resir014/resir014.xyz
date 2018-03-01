import * as React from 'react'
import styled from 'styled-components'

import { media } from '../../styles/mixins'
import { colors } from '../../styles/variables'

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
  font-size: 1.25rem;
  font-weight: 300;

  ${media.sm`
    width: 75%;
    font-size: 1.5rem;
  `}
`
