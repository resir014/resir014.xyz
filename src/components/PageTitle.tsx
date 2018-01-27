import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../utils/theme'
import { sectionHeading } from '../utils/globalStyles'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

export default styled(PageTitle)`
  margin: 0;

  span {
    ${sectionHeading(colors.white, '.25rem', '.5rem')}
  }
`
