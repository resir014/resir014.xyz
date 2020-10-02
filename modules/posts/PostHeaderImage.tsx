import { css } from '@emotion/core'
import * as React from 'react'
import { Box } from '~/components/chungking-core'
import { Container } from '~/components/layout'

interface PostHeaderImageProps {
  src: string
  alt?: string
}

const PostHeaderImage: React.FC<PostHeaderImageProps> = ({ alt, src }) => {
  return (
    <Box as="section" px="lg">
      <Container size="xl">
        <Box height="100%" maxHeight={560} overflow="hidden">
          <img
            alt={alt}
            src={src}
            css={css`
              margin: 0;
              width: 100%;
              height: 100%;
              max-height: 560px;
              object-fit: cover;
            `}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default PostHeaderImage
