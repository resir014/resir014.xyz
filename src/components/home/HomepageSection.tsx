import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageSectionProps {
  className?: string
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <section className={className}>{children}</section>
)

export default styled(HomepageSection)`
  text-align: center;

  p {
    font-size: 1.25rem;
    font-weight: 300;
    color: ${colors.grey90};

    ${media.md`
      font-size: 1.5rem;
    `}
  }
`
