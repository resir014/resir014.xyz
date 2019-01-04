import * as React from 'react'
import Button from '../ui/Button'
import styled from '@emotion/styled'

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

const PaginationLink: React.SFC<PaginationLinkProps> = ({ test, url, text }) => {
  if (!test) {
    return (
      <StyledPaginationLink kind="nav-link" color="primary" size="lg" to={url}>
        {text}
      </StyledPaginationLink>
    )
  }

  return (
    <StyledPaginationLink kind="button" size="lg" disabled>
      {text}
    </StyledPaginationLink>
  )
}

export default PaginationLink
