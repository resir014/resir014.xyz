import * as React from 'react'
import { transparentize } from 'polished'
import { useStaticQuery, graphql } from 'gatsby'

import { SiteMetadata } from '../../types/gatsby'
import { Heading, Text, Box, colors } from '../chungking-core'

interface HomepageThumbnailTextProps {
  className?: string
  style?: React.CSSProperties
}

interface QueryData {
  site: {
    siteMetadata: SiteMetadata
  }
}

const HomepageHeroText: React.FC<HomepageThumbnailTextProps> = ({ className, style }) => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      site {
        siteMetadata {
          flavourText
        }
      }
    }
  `)

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      textAlign={['center', null, null, null, 'left']}
    >
      <Box
        className={className}
        style={style}
        display="flex"
        alignItems="center"
        width="100%"
        maxWidth={640}
        height={[160, null, null, null, 240]}
        p={['md', null, null, null, 'lg']}
        backgroundColor={transparentize(0.5, colors.ultramarine30)}
        border="2px solid"
        borderColor="ultramarine30"
        borderRadius={8}
      >
        <Box>
          <Heading as="h1" display="inline-block" variant={800} mt={0} mr="sm" color="white">
            resir014
          </Heading>
          <Text as="p" display="inline-block" variant={800} m={0} fontWeight={300} color="white">
            {data.site.siteMetadata.flavourText}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default HomepageHeroText
