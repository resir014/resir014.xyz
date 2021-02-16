import { Box, theme } from '@resir014/chungking-react'
import { darken, transparentize } from 'polished'
import * as React from 'react'

import BackgroundPattern from '~/assets/images/texture.svg'

interface HeroWrapperProps {
  className?: string
}

const HeroWrapper: React.FC<HeroWrapperProps> = ({ children, className }) => {
  return (
    <Box
      as="header"
      display="grid"
      gridTemplateColumns={`1fr 1fr minmax(auto, ${theme.sizes.containers.md}px) 1fr 1fr`}
      position="relative"
      m={0}
      py="xxl"
      px="lg"
      backgroundColor={darken(0.05, theme.colors.black)}
      background={`linear-gradient(0deg, ${transparentize(0.75, theme.colors.black)}, ${transparentize(
        0.75,
        theme.colors.ultramarine[700]
      )}), url(${BackgroundPattern})`}
      borderBottom="1px solid"
      borderBottomColor="grey.900"
      className={className}
    >
      <Box display="flex" flexDirection="column" gridColumn="3/4">
        {children}
      </Box>
    </Box>
  )
}

export default HeroWrapper
