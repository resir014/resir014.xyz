import * as React from 'react'
import styled from 'react-emotion'

interface PostMetaItemProps {
  className?: string
}

const PostMetaItem: React.SFC<PostMetaItemProps> = ({ className, children }) => (
  <Span className={className}>{children}</Span>
)

export default PostMetaItem

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
