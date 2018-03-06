import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageSectionProps {
  className?: string
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export default styled(HomepageSection)`
  margin-top: 1.5rem;
  text-align: center;
`
