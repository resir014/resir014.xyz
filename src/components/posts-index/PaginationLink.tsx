import * as React from 'react'
import styled from '@emotion/styled'

import { Button, NavLinkButton } from '../ui'

interface PaginationLinkProps {
  test: boolean
  url: string
  text: string
}

const StyledPaginationLink = styled(Button)`
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const StyledPaginationNavLink = styled(NavLinkButton)`
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const PaginationLink: React.SFC<PaginationLinkProps> = ({ test, url, text }) => {
  if (!test) {
    return (
      <StyledPaginationNavLink color="primary" size="lg" to={url}>
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
