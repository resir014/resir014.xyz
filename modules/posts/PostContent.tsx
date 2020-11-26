import * as React from 'react'

import { Box, BoxProps } from '@resir014/chungking-react'

interface PostContentProps extends BoxProps {
  className?: string
  style?: React.CSSProperties
}

const PostContent: React.FC<PostContentProps> = ({ children, className, style, ...rest }) => (
  <Box as="section" className={className} style={style} display="block" p="lg" pb="xxl" {...rest}>
    {children}
  </Box>
)

export default PostContent
