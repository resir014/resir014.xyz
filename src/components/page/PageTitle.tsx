import * as React from 'react'
import styled from 'react-emotion'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <H1 className={className}>{children}</H1>
)

export default PageTitle

const H1 = styled('h1')`
  margin: 0;
`
