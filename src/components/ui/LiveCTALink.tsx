import * as React from 'react'
import { ExternalLink, DollarSign } from 'react-feather'

import { Box, Text, UnstyledAnchor, UnstyledLink } from '../chungking-core'

interface LiveCTAProps {
  backgroundColor: string
  to: string
  isExternal?: boolean
}

const BoxBase: React.FC<Pick<LiveCTAProps, 'backgroundColor'>> = ({
  backgroundColor,
  children
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p={16}
      bg={backgroundColor}
      borderRadius={6}
      boxShadow="single"
    >
      {children}
    </Box>
  )
}

const LiveCTALink: React.FC<LiveCTAProps> = ({ backgroundColor, to, isExternal, children }) => {
  if (isExternal) {
    return (
      <UnstyledAnchor href={to} target="_blank" rel="noopener noreferrer">
        <BoxBase backgroundColor={backgroundColor}>
          <Text scale="greatPrimer">{children}</Text>
          <ExternalLink size={24} />
        </BoxBase>
      </UnstyledAnchor>
    )
  }

  return (
    <UnstyledLink to={to}>
      <BoxBase backgroundColor={backgroundColor}>
        <Text scale="greatPrimer">{children}</Text>
        <DollarSign size={24} />
      </BoxBase>
    </UnstyledLink>
  )
}

export default LiveCTALink
