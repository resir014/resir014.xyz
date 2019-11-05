import * as React from 'react'
import styled from '@emotion/styled'
import { space } from '../chungking-core'

interface HomepageSectionProps {
  className?: string
}

const HomepageSectionFooter: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

export default HomepageSectionFooter

const Div = styled('div')`
  margin-top: ${space.xl}px;
  text-align: center;
`
