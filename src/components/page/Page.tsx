import * as React from 'react'
import styled from '@emotion/styled'

const StyledPage = styled('main')`
  display: block;
  flex: 1;
  position: relative;
  padding: 0;
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => (
  <StyledPage className={className}>{children}</StyledPage>
)

export default Page
