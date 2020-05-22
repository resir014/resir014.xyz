import * as React from 'react'
import { transparentize } from 'polished'

import { Heading, Text, Box, colors } from '../chungking-core'

interface HomepageThumbnailTextProps {
  className?: string
  title: string
  flavour?: string
}

const HomepageHeroText: React.SFC<HomepageThumbnailTextProps> = ({ className, title, flavour }) => (
  <Box
    display="flex"
    flex="1 1 auto"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
  >
    <Box
      className={className}
      padding="lg"
      border="2px solid"
      borderColor="black"
      backgroundColor={transparentize(0.75, colors.black)}
      borderRadius={10}
      boxShadow="double"
    >
      <Heading as="h1" variant={900} mt={0} mb="md" color="white">
        {title}
      </Heading>
      {flavour && (
        <Text variant={600} m={0} fontWeight={300} color="white">
          {flavour}
        </Text>
      )}
    </Box>
  </Box>
)

export default HomepageHeroText
