import * as React from 'react'
import convert from 'htmr'
import { Box, Stack } from '@resir014/chungking-react'

import htmrTransform from '~/lib/htmr-transform'
import { Container, ContainerSizes } from '~/components/layout'
import PhotoWrapper from './PhotoWrapper'

interface PhotoPostBodyProps {
  content?: string
  image?: string
  containerSize?: ContainerSizes
}

const PhotoPostBody: React.FC<PhotoPostBodyProps> = ({ content, containerSize = 'md', image, children }) => {
  if (content) {
    return (
      <Box as="section" p="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing="md">
            {image && <PhotoWrapper image={image} />}
            <Stack className="e-content" spacing="md">
              {convert(content, { transform: htmrTransform })}
            </Stack>
          </Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing="md">
          {image && <PhotoWrapper image={image} />}
          <Stack className="e-content" spacing="md">
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default PhotoPostBody
