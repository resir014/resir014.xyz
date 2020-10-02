import { css } from '@emotion/core'
import { hsl, parseToHsl } from 'polished'
import * as React from 'react'
import { Box, colors, Iframe, ResponsiveWrapper, Text } from '~/components/chungking-core'
import { useTwitchData } from '~/lib/twitch-api'

interface LiveEmbeddablePlayerProps {
  username?: string
}

const LiveEmbeddablePlayer: React.FC<LiveEmbeddablePlayerProps> = ({ username }) => {
  const { data, isLoading, isError } = useTwitchData(username)
  const backgroundHsl = parseToHsl(colors.grey90)
  const textHsl = parseToHsl(colors.grey10)

  const renderPlayer = () => {
    if (data && !isError) {
      return (
        <ResponsiveWrapper borderRadius={6} overflow="hidden">
          <Iframe
            src={`https://player.twitch.tv/?channel=${data.user_name}&parent=resir014.xyz`}
            frameBorder={0}
            allowFullScreen
            scrolling="no"
          />
        </ResponsiveWrapper>
      )
    }

    return (
      <ResponsiveWrapper borderRadius={6} overflow="hidden" height="100%" maxHeight={360}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={hsl(backgroundHsl.hue, backgroundHsl.saturation, backgroundHsl.lightness * 0.4)}
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            user-select: none;
          `}
        >
          <Text
            variant={800}
            color={hsl(textHsl.hue, textHsl.saturation, textHsl.lightness * 0.4)}
            css={css`
              text-transform: uppercase;
              letter-spacing: 0.2em;
            `}
          >
            {isLoading ? null : 'Offline'}
          </Text>
        </Box>
      </ResponsiveWrapper>
    )
  }

  return (
    <Box width="100%" maxWidth={[null, null, null, null, 640]}>
      {renderPlayer()}
    </Box>
  )
}

export default LiveEmbeddablePlayer
