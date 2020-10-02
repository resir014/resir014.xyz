import * as React from 'react'
import convert from 'htmr'

import htmrTransform from '~/lib/htmr-transform'
import { Box, Stack } from '~/components/chungking-core'
import { Container, ContainerSizes } from '~/components/layout'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
}

const PostBody: React.FC<PostBodyProps> = ({ content, containerSize = 'md', children }) => {
  if (content) {
    return (
      <Box as="section" p="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing="md">{convert(content, { transform: htmrTransform })}</Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing="md">{children}</Stack>
      </Container>
    </Box>
  )
}

export default PostBody
