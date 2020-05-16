import * as React from 'react'
import { css } from '@emotion/core'

import { Box, Heading, Text, UnstyledLink } from '../chungking-core'
import TwitchLogo from '../../assets/images/logo-twitch.png'

const LogoStyles = css`
  display: inline-block;
  width: 48px;
  margin: 0;
`

const LiveBanner: React.FC = () => {
  return (
    <UnstyledLink to="/live">
      <Box
        display="grid"
        gridTemplateColumns="auto 48px"
        gridGap="md"
        p="md"
        bg="#9146FF"
        borderRadius={6}
        boxShadow="single"
      >
        <Box flex="1 1 auto" mr="md">
          <Heading m={0}>resir014 is now on Twitch</Heading>
          <Text display="inline-block" mt="xxs">
            Follow me and watch my live coding and gaming streams!
          </Text>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img css={LogoStyles} src={TwitchLogo} alt="Twitch Logo" />
        </Box>
      </Box>
    </UnstyledLink>
  )
}

export default LiveBanner