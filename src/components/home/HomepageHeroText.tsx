import * as React from 'react'

import { Heading, Text, Box } from '../chungking-core'

interface HomepageThumbnailTextProps {
  className?: string
  title: string
  flavour?: string
}

const HomepageHeroText: React.FC<HomepageThumbnailTextProps> = ({ className, title, flavour }) => (
  <Box
    display="flex"
    flex="1 1 auto"
    flexDirection="row"
    alignItems="center"
    justifyContent="flex-start"
    textAlign={['center', null, null, null, 'left']}
  >
    <Box className={className} width="100%" maxWidth={640}>
      <Heading as="h1" display="inline-block" variant={800} mt={0} mr="sm" color="white">
        {title}
      </Heading>
      {flavour && (
        <Text as="p" display="inline-block" variant={800} m={0} fontWeight={300} color="white">
          {flavour}
        </Text>
      )}
    </Box>
  </Box>
)

export default HomepageHeroText
