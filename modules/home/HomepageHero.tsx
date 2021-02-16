import * as React from 'react'
import { transparentize } from 'polished'

import { theme, Heading, Text, Stack } from '@resir014/chungking-react'

import siteMetadata from '~/_data/siteMetadata.json'
import { HeroWrapper } from '~/components/layout'

const HomepageHero: React.FC = () => {
  const { author } = siteMetadata

  return (
    <HeroWrapper>
      <Stack
        className="p-author h-card"
        spacing="xs"
        p="lg"
        backgroundColor={transparentize(0.75, theme.colors.blue[500])}
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
    </HeroWrapper>
  )
}

export default HomepageHero
