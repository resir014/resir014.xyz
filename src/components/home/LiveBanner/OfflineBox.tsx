import { css } from '@emotion/core'
import { hsl, parseToHsl } from 'polished'
import * as React from 'react'
import {
  Anchor,
  Box,
  colors,
  Heading,
  Paragraph,
  ResponsiveWrapper,
  Text
} from '../../chungking-core'

const OfflineBox: React.FC = () => {
  const backgroundHsl = parseToHsl(colors.grey90)
  const textHsl = parseToHsl(colors.grey10)

  return (
    <>
      <ResponsiveWrapper borderRadius={6} overflow="hidden" boxShadow="single">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={hsl(
            backgroundHsl.hue,
            backgroundHsl.saturation,
            backgroundHsl.lightness * 0.4
          )}
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
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
            Offline
          </Text>
        </Box>
      </ResponsiveWrapper>
      <Box mt="md" textAlign="center">
        <Heading variant={500}>resir014 is offline.</Heading>
        <Paragraph>
          Follow me on{' '}
          <Anchor href="https://www.twitch.tv/resir014" target="_blank" rel="noopener noreferrer">
            Twitch
          </Anchor>{' '}
          to be notified when I go live!
        </Paragraph>
      </Box>
    </>
  )
}

export default OfflineBox
