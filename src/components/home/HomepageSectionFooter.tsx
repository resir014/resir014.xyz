import * as React from 'react'
import styled from 'react-emotion'

interface HomepageSectionProps {
  className?: string
}

const HomepageSectionFooter: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

export default HomepageSectionFooter

const Div = styled('div')`
  margin-top: 1.5rem;
  text-align: center;
`
