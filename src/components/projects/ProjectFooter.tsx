import * as React from 'react'
import styled from '@emotion/styled'
import { space } from '../chungking-core'

interface PageProps {
  className?: string
}

const ProjectFooter: React.FC<PageProps> = ({ children, className }) => (
  <Div className={className}>{children}</Div>
)

export default ProjectFooter

const Div = styled('div')`
  margin-top: ${space.xl}px;
`
