import * as React from 'react'
import { darken } from 'polished'

import { colors, widths, Box } from '~/components/chungking-core'
import BackgroundPattern from '~/assets/images/architect.svg'

interface LiveBannerHeroProps {
  className?: string
}

const LiveBannerHero: React.FC<LiveBannerHeroProps> = ({ className, children }) => (
  <Box
    as="header"
    display="grid"
    gridTemplateColumns={`1fr 1fr minmax(auto, ${widths.xl}px) 1fr 1fr`}
    position="relative"
    m={0}
    py="xxl"
    px="lg"
    backgroundColor={darken(0.05, colors.black)}
    background={`linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${BackgroundPattern})`}
    borderBottom="1px solid"
    borderBottomColor="grey90"
    className={className}
  >
    <Box display="flex" flexDirection="column" gridColumn="3/4">
      {children}
    </Box>
  </Box>
)

export default LiveBannerHero
