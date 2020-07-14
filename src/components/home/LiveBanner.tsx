import * as React from 'react'
import { css } from '@emotion/core'
import { parseToHsl, hsl } from 'polished'

import { Box, Heading, Text, UnstyledLink } from '../chungking-core'
import TwitchLogo from '../../assets/images/logo-twitch.png'

const LogoStyles = css`
  display: inline-block;
  width: 48px;
  margin: 0;
`

const backgroundHsl = parseToHsl('#9146FF')

const LiveBanner: React.FC = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto 48px"
      gridGap="md"
      position="relative"
      p="md"
      border="2px solid"
      borderColor="#9146FF"
      backgroundColor={hsl(
        backgroundHsl.hue,
        backgroundHsl.saturation,
        backgroundHsl.lightness * 0.5
      )}
      borderRadius={8}
      boxShadow="single"
    >
      <Box flex="1 1 auto" mr="md">
        <Heading m={0}>
          <UnstyledLink
            to="/live"
            css={css`
              cursor: pointer;

              &::after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
              }

              &:hover,
              &:focus {
                text-decoration: underline;
              }
            `}
          >
            Live on Twitch!
          </UnstyledLink>
        </Heading>
        <Text display="inline-block" mt="xxs">
          Follow me and watch my live coding and gaming streams.
        </Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img css={LogoStyles} src={TwitchLogo} alt="Twitch Logo" />
      </Box>
    </Box>
  )
}

export default LiveBanner
