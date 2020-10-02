import * as React from 'react'
import convert from 'htmr'

import { Box, Stack } from '~/components/chungking-core'
import { Container, ContainerSizes } from '~/components/layout'
import htmrTransform from '~/lib/htmr-transform'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
  projectLink?: string
}

const PostBody: React.FC<PostBodyProps> = ({ content, containerSize = 'md', children }) => {
  if (content) {
    return (
      <Box as="section" pt="xxl" px="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing="md">{convert(content, { transform: htmrTransform })}</Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" pt="xxl" px="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing="md">{children}</Stack>
      </Container>
    </Box>
  )
}

export default PostBody
