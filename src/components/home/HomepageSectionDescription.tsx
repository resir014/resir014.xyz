import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageSectionDescriptionProps {
  className?: string
}

const HomepageSectionDescription: React.SFC<HomepageSectionDescriptionProps> = ({ children, className }) => (
  <p className={className}>{children}</p>
)

export default styled(HomepageSectionDescription)`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 300;

  ${media.md`
    font-size: 1.5rem;
  `}
`
