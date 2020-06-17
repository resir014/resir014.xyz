import * as React from 'react'

import { Box } from '../chungking-core'

interface PostMetaProps {
  className?: string
}

const PageMeta: React.FC<PostMetaProps> = ({ className, children }) => (
  <Box mb="md" className={className}>
    {children}
  </Box>
)

export default PageMeta
