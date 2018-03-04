import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'

interface PageProps {
  className?: string
}

const ProjectFooter: React.SFC<PageProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export default styled(ProjectFooter)`
  margin-top: 2rem;
`
