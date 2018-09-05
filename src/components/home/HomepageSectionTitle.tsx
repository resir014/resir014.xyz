import * as React from 'react'
import styled from 'react-emotion'

interface HomepageSectionTitleProps {
  className?: string
}

const HomepageSectionTitle: React.SFC<HomepageSectionTitleProps> = ({ children, className }) => (
  <H1 className={className}>{children}</H1>
)

export default HomepageSectionTitle

const H1 = styled('h1')`
  text-align: center;
`
