import Link from 'next/link'
import * as React from 'react'

import { Box, Text, UnstyledAnchor, Color } from '../chungking-core'

interface LiveCTAProps {
  backgroundColor?: Color | string
  color?: Color | string
  href: string
  isExternal?: boolean
  icon?: React.ReactNode
}

const BoxBase: React.FC<Pick<LiveCTAProps, 'backgroundColor'>> = ({ backgroundColor, children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p={16}
      bg={backgroundColor || 'grey.900'}
      borderRadius={6}
      boxShadow="single"
    >
      {children}
    </Box>
  )
}

const LiveCTALink: React.FC<LiveCTAProps> = ({ backgroundColor, color, href, isExternal, children, icon }) => {
  if (isExternal) {
    return (
      <UnstyledAnchor href={href} target="_blank" rel="noopener noreferrer">
        <BoxBase backgroundColor={backgroundColor}>
          <Text variant={500} color={color || 'white'}>
            {children}
          </Text>
          {icon}
        </BoxBase>
      </UnstyledAnchor>
    )
  }

  return (
    <Link href={href} passHref>
      <BoxBase backgroundColor={backgroundColor}>
        <Text variant={500}>{children}</Text>
        {icon}
      </BoxBase>
    </Link>
  )
}

export default LiveCTALink
