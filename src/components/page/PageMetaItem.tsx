import * as React from 'react'
import styled from '@emotion/styled'
import { Text } from '../chungking-core'

interface PostMetaItemProps {
  className?: string
}

const Span = styled(Text)`
  text-transform: uppercase;

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

const PageMetaItem: React.SFC<PostMetaItemProps> = ({ className, children }) => (
  <Span scale="pica" fontWeight={300} className={className}>
    {children}
  </Span>
)

export default PageMetaItem
