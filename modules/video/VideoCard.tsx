import * as React from 'react'

import { Box, BoxProps, Heading, Stack } from '@resir014/chungking-react'

interface VideoCardProps extends BoxProps {
  metadata?: React.ReactNode
  embed: React.ReactNode
  title?: React.ReactNode
}

const VideoCard: React.FC<VideoCardProps> = ({ metadata, embed, title, children, ...rest }) => {
  return (
    <Box backgroundColor="grey.900" borderRadius={6} boxShadow="single" overflow="hidden" {...rest}>
      {embed}
      {title || children ? (
        <Stack spacing="sm" p="lg" position="relative">
          {metadata}
          {title && (
            <Heading as="h1" variant="2xl" className="p-name">
              {title}
            </Heading>
          )}
          {children}
        </Stack>
      ) : null}
    </Box>
  )
}

export default VideoCard
