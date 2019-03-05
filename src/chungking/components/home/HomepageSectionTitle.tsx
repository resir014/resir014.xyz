import * as React from 'react'
import styled from '@emotion/styled'

interface HomepageSectionTitleProps {
  className?: string
}

export const HomepageSectionTitle: React.SFC<HomepageSectionTitleProps> = ({
  children,
  className
}) => <H1 className={className}>{children}</H1>

const H1 = styled('h1')`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`
