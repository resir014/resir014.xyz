import * as React from 'react'

import { P } from '../chungking-core'

interface BlogPostExcerptProps {
  className?: string
}

const BlogPostExcerpt: React.FC<BlogPostExcerptProps> = ({ className, children }) => (
  <P className={className}>{children}</P>
)

export default BlogPostExcerpt
