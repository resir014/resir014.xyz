import { css } from '@emotion/react'
import { hsl, parseToHsl } from 'polished'
import * as React from 'react'
import { Box, colors, AspectRatio, Iframe, Text } from '@resir014/chungking-react'
import { useTwitchData } from '~/lib/twitch-api'

interface LiveEmbeddablePlayerProps {
  username?: string
}

const LiveEmbeddablePlayer: React.FC<LiveEmbeddablePlayerProps> = ({ username }) => {
  const { data, isLoading, isError } = useTwitchData(username)
  const backgroundHsl = parseToHsl(colors.grey[900])
  const textHsl = parseToHsl(colors.grey[50])

  const renderPlayer = () => {
    if (data && !isError) {
      return (
        <Iframe
          src={`https://player.twitch.tv/?channel=${data.user_name}&parent=resir014.xyz`}
          frameBorder={0}
          allowFullScreen
          scrolling="no"
        />
      )
    }

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={hsl(backgroundHsl.hue, backgroundHsl.saturation, backgroundHsl.lightness * 0.4)}
      >
        <Text
          variant={800}
          color={hsl(textHsl.hue, textHsl.saturation, textHsl.lightness * 0.4)}
          css={css`
            text-transform: uppercase;
            letter-spacing: 0.2em;
          `}
        >
          {isLoading ? 'Loading...' : 'Offline'}
        </Text>
      </Box>
    )
  }

  return (
    <Box width="100%" maxWidth={[null, null, null, null, 640]} mx="auto">
      <AspectRatio ratio={16 / 9} borderRadius={6} overflow="hidden" maxHeight={360} boxShadow="double">
        {renderPlayer()}
      </AspectRatio>
    </Box>
  )
}

export default LiveEmbeddablePlayer
