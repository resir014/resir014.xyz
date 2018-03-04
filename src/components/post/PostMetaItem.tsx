import * as React from 'react'
import styled from 'styled-components'

interface PostMetaItemProps {
  className?: string
}

const PostMetaItem: React.SFC<PostMetaItemProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
)

export default styled(PostMetaItem)`
  &:not(:first-of-type) {
    margin-left: .5rem;

    &:before {
      content: "/";
      margin-right: .5rem;
    }
  }
`
