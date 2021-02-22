import * as React from 'react'

import { Heading, Text, Stack, Anchor, Paragraph } from '@resir014/chungking-react'

import siteMetadata from '~/_data/siteMetadata.json'
import { HeroWrapper } from '~/components/layout'

const HomepageHero: React.FC = () => {
  const { author } = siteMetadata

  return (
    <HeroWrapper>
      <Stack spacing="xxl">
        <Stack className="p-author h-card" spacing="xs">
          <Heading as="h1" className="p-name" variant={900} color="turquoise.400">
            {author.name}
          </Heading>
          <Text as="p" className="p-note" variant={500}>
            {author.description}
          </Text>
          <Anchor display="none" className="u-url u-uid" href={author.website}>
            {author.website}
          </Anchor>
        </Stack>
        <Paragraph>
          <strong>Hey there, I&apos;m Resi!</strong> I&apos;m a self-taught web developer based in Jakarta, Indonesia. I aim to blur the
          line between high-performance engineering and good design.
        </Paragraph>
      </Stack>
    </HeroWrapper>
  )
}

export default HomepageHero
