import * as React from 'react'
import styled from 'styled-components'

interface PageContentProps {
  className?: string
}

const PageContent: React.SFC<PageContentProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(PageContent)`
  margin-top: 3rem;
`
