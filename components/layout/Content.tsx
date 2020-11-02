import * as React from 'react'
import { Box } from '../chungking-core'

interface ContentProps {
  className?: string
  style?: React.CSSProperties
}

const Content: React.FC<ContentProps> = ({ children }) => (
  <Box as="main" display="block" flex="1 1 auto" position="relative" p={0}>
    {children}
  </Box>
)

export default Content
