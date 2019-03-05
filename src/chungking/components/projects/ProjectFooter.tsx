import * as React from 'react'
import styled from '@emotion/styled'

interface PageProps {
  className?: string
}

export const ProjectFooter: React.SFC<PageProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

const Div = styled('div')`
  margin-top: 2rem;
`
