import * as React from 'react'
import { darken, transparentize } from 'polished'

import { colors, widths, Box, Heading, Text, Stack } from '@resir014/chungking-react'
import BackgroundPattern from '~/assets/images/texture.svg'

import siteMetadata from '~/_data/siteMetadata.json'

interface LiveBannerHeroProps {
  className?: string
}

const HomepageHero: React.FC<LiveBannerHeroProps> = ({ className }) => {
  const { author } = siteMetadata

  return (
    <Box
      as="header"
      display="grid"
      gridTemplateColumns={`1fr 1fr minmax(auto, ${widths.md}px) 1fr 1fr`}
      position="relative"
      m={0}
      py="xxl"
      px="lg"
      backgroundColor={darken(0.05, colors.black)}
      background={`linear-gradient(0deg, ${transparentize(0.75, colors.black)}, ${transparentize(
        0.75,
        colors.ultramarine[700]
      )}), url(${BackgroundPattern})`}
      borderBottom="1px solid"
      borderBottomColor="grey.900"
      className={className}
    >
      <Box display="flex" flexDirection="column" gridColumn="3/4">
        <Stack
          className="p-author h-card"
          spacing="xs"
          p="lg"
          backgroundColor={transparentize(0.75, colors.blue[500])}
          borderLeft="4px solid"
          borderLeftColor="blue.500"
          boxShadow="double"
        >
          <Heading as="h1" className="p-name" variant={900} color="turquoise.400">
            {author.name}
          </Heading>
          <Text as="p" className="p-note" variant={500}>
            {author.description}
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default HomepageHero
