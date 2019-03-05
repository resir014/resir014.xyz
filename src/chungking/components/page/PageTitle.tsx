import * as React from 'react'
import styled from '@emotion/styled'

interface PageTitleProps {
  className?: string
}

export const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <H1 className={className}>{children}</H1>
)

const H1 = styled('h1')`
  margin: 0;
  margin-top: 0.5rem;
`
