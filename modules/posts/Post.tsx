import clsx from 'clsx'
import * as React from 'react'

interface PostProps {
  className?: string
  style?: React.CSSProperties
}

const Post: React.FC<PostProps> = ({ children, className, style }) => {
  return (
    <article className={clsx('h-entry', className)} style={style}>
      {children}
    </article>
  )
}

export default Post
