import * as React from 'react'
import styled from '@emotion/styled'

import { space, Button } from '../chungking-core'
import { NavLinkButton } from '../ui'

interface PaginationLinkProps {
  test: boolean
  url: string
  text: string
}

const StyledPaginationLink = styled(Button)`
  margin-bottom: ${space.md}px;
  margin-left: ${space.xs}px;
  margin-right: ${space.xs}px;
`

const StyledPaginationNavLink = styled(NavLinkButton)`
  margin-bottom: ${space.md}px;
  margin-left: ${space.xs}px;
  margin-right: ${space.xs}px;
`

const PaginationLink: React.FC<PaginationLinkProps> = ({ test, url, text }) => {
  if (!test) {
    return (
      <StyledPaginationNavLink variant="primary" size="lg" to={url}>
        {text}
      </StyledPaginationNavLink>
    )
  }

  return (
    <StyledPaginationLink size="lg" disabled>
      {text}
    </StyledPaginationLink>
  )
}

export default PaginationLink
