import * as React from 'react'
import styled from 'react-emotion'

interface PostTitleProps {
  className?: string
  darkBackground?: boolean
}

const PostTitle: React.SFC<PostTitleProps> = ({ className, children }) => (
  <H1 className={className}>{children}</H1>
)

export default PostTitle

const H1 = styled('h1')`
  margin: 0;
  margin-top: 0.5rem;
`
