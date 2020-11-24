import * as React from 'react'

import { Box } from '@resir014/chungking-core'

import LiveEmbeddablePlayer from './LiveEmbeddablePlayer'
import LiveStreamStatus from './LiveStreamStatus'
import LiveBannerHero from './LiveBannerHero'

interface LiveBannerProps {
  username?: string
}

const LiveBanner: React.FC<LiveBannerProps> = ({ username = 'resir014' }) => {
  return (
    <LiveBannerHero>
      <Box
        display="grid"
        gridTemplateColumns={['1fr', null, null, null, '640px 1fr']}
        backgroundColor="black"
        boxShadow="double"
        borderRadius={6}
        overflow="hidden"
      >
        <LiveEmbeddablePlayer username={username} />
        <LiveStreamStatus username={username} />
      </Box>
    </LiveBannerHero>
  )
}

export default LiveBanner
