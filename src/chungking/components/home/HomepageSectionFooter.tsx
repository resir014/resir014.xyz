import * as React from 'react'
import styled from '@emotion/styled'

interface HomepageSectionProps {
  className?: string
}

export const HomepageSectionFooter: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

const Div = styled('div')`
  margin-top: 2rem;
  text-align: center;
`
