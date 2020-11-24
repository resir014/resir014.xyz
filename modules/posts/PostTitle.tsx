import * as React from 'react'
import { Heading } from '@resir014/chungking-core'

interface PostTitleProps {
  className?: string
  style?: React.CSSProperties
}

const PostTitle: React.FC<PostTitleProps> = ({ className, style, children }) => (
  <Heading as="h1" variant={900} className={className} style={style} m={0}>
    {children}
  </Heading>
)

export default PostTitle
