import * as React from 'react'

import { Box, Text, UnstyledAnchor, UnstyledLink, Color } from '../chungking-core'

interface LiveCTAProps {
  backgroundColor?: Color | string
  color?: Color | string
  to: string
  isExternal?: boolean
  icon?: React.ReactNode
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
      bg={backgroundColor || 'grey90'}
      borderRadius={6}
      boxShadow="single"
    >
      {children}
    </Box>
  )
}

const LiveCTALink: React.FC<LiveCTAProps> = ({
  backgroundColor,
  color,
  to,
  isExternal,
  children,
  icon
}) => {
  if (isExternal) {
    return (
      <UnstyledAnchor href={to} target="_blank" rel="noopener noreferrer">
        <BoxBase backgroundColor={backgroundColor}>
          <Text scale="greatPrimer" color={color || 'white'}>
            {children}
          </Text>
          {icon}
        </BoxBase>
      </UnstyledAnchor>
    )
  }

  return (
    <UnstyledLink to={to}>
      <BoxBase backgroundColor={backgroundColor}>
        <Text scale="greatPrimer">{children}</Text>
        {icon}
      </BoxBase>
    </UnstyledLink>
  )
}

export default LiveCTALink
