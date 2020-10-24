import * as React from 'react'
import convert from 'htmr'

import htmrTransform from '~/lib/htmr-transform'
import { Box, Space, Stack } from '~/components/chungking-core'
import { Container, ContainerSizes } from '~/components/layout'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
  spacing?: Space | number
}

const PostBody: React.FC<PostBodyProps> = ({ content, containerSize = 'md', spacing = 'md', children }) => {
  if (content) {
    return (
      <Box as="section" p="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing={spacing}>{convert(content, { transform: htmrTransform })}</Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing={spacing}>{children}</Stack>
      </Container>
    </Box>
  )
}

export default PostBody
