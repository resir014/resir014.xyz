import * as React from 'react'
import { TwitchData } from '../../../types/default'
import { Anchor, Box, Heading, Iframe, Paragraph, ResponsiveWrapper } from '../../chungking-core'

interface OnlineBoxProps {
  stream: TwitchData
}

const OnlineBox: React.FC<OnlineBoxProps> = ({ stream }) => {
  return (
    <>
      <ResponsiveWrapper borderRadius={6} overflow="hidden" boxShadow="single">
        <Iframe
          src={`https://player.twitch.tv/?channel=${stream.user_name}&parent=resir014.xyz`}
          frameBorder={0}
          allowFullScreen
          scrolling="no"
        />
      </ResponsiveWrapper>
      <Box mt="md" textAlign="center">
        <Heading variant={500}>{stream.user_name} is online!</Heading>
        <Paragraph>
          Streaming to {stream.viewer_count} users. Join the conversation on{' '}
          <Anchor href="https://www.twitch.tv/resir014" target="_blank" rel="noopener noreferrer">
            Twitch
          </Anchor>
          !
        </Paragraph>
      </Box>
    </>
  )
}

export default OnlineBox
