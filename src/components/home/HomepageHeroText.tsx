import * as React from 'react'

import { Heading, Text, Box } from '../chungking-core'

interface HomepageThumbnailTextProps {
  className?: string
  title: string
  flavour?: string
}

const HomepageHeroText: React.SFC<HomepageThumbnailTextProps> = ({ className, title, flavour }) => (
  <Box
    className={className}
    display="flex"
    flex="1 1 auto"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
  >
    <Box padding="lg" backgroundColor="black" borderRadius={10} boxShadow="double">
      <Heading as="h1" scale={900} mt={0} mb="md" color="white">
        {title}
      </Heading>
      {flavour && (
        <Text scale={600} m={0} fontWeight={300} color="white">
          {flavour}
        </Text>
      )}
    </Box>
  </Box>
)

export default HomepageHeroText
