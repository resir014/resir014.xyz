import * as React from 'react'
import styled from '@emotion/styled'

interface PostMetaItemProps {
  className?: string
}

const PageMetaItem: React.SFC<PostMetaItemProps> = ({ className, children }) => (
  <Span className={className}>{children}</Span>
)

export default PageMetaItem

const Span = styled('span')`
  &:not(:first-of-type) {
    margin-left: 0.5rem;

    &:before {
      content: '/';
      margin-right: 0.5rem;
    }
  }

  a {
    color: inherit;
  }
`
