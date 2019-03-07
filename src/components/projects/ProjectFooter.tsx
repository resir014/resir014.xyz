import * as React from 'react'
import styled from '@emotion/styled'

interface PageProps {
  className?: string
}

const ProjectFooter: React.SFC<PageProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

export default ProjectFooter

const Div = styled('div')`
  margin-top: 2rem;
`
