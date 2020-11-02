import { css } from '@emotion/core'
import Image from 'next/image'
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
        <Image
          className="u-photo"
          loading="lazy"
          src={src}
          alt={alt}
          width={1140}
          height={671}
          unoptimized
          css={css`
            object-fit: cover;
          `}
        />
      </Container>
    </Box>
  )
}

export default PostHeaderImage
