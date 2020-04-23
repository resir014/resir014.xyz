import * as React from 'react'
import { Box, Heading, Text, UnstyledLink } from '../chungking-core'

const LiveBanner: React.FC = () => {
  return (
    <UnstyledLink to="/live">
      <Box
        display="flex"
        flexDirection="row"
        p={16}
        bg="#9146FF"
        borderRadius={6}
        boxShadow="single"
      >
        <Box flex="1 1 auto" mr="md">
          <Heading m={0}>resir014 is now on Twitch</Heading>
          <Text mt="xs">Follow me and watch my live coding and gaming streams!</Text>
        </Box>
        <Box>LOGO HERE</Box>
      </Box>
    </UnstyledLink>
  )
}

export default LiveBanner
