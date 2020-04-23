import * as React from 'react'

import { Box, Text, UnstyledAnchor, UnstyledLink } from '../chungking-core'

interface LiveCTAProps {
  backgroundColor: string
  to: string
  isExternal?: boolean
}

const LiveCTALink: React.FC<LiveCTAProps> = ({ backgroundColor, to, isExternal, children }) => {
  if (isExternal) {
    return (
      <UnstyledAnchor href={to} target="_blank" rel="noopener noreferrer">
        <Box p={16} bg={backgroundColor} borderRadius={6} boxShadow="single">
          <Text scale="greatPrimer">{children}</Text>
        </Box>
      </UnstyledAnchor>
    )
  }

  return (
    <UnstyledLink to={to}>
      <Box p={16} bg={backgroundColor} borderRadius={6} boxShadow="single">
        <Text scale="greatPrimer">{children}</Text>
      </Box>
    </UnstyledLink>
  )
}

export default LiveCTALink
