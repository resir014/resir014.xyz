import Link from 'next/link'
import * as React from 'react'
import convert from 'htmr'
import { Box, Stack, StackProps, UnstyledAnchor } from '~/components/chungking-core'
import { BasePhotoProps } from '~/types/posts'
import htmrTransform from '~/lib/htmr-transform'
import { PostMeta } from '../posts'
import PhotoWrapper from './PhotoWrapper'

interface PhotoListItemProps extends StackProps {
  photo: BasePhotoProps
}

const PhotoListItem: React.FC<PhotoListItemProps> = ({ photo, className, style, ...rest }) => {
  const { date, category, header_image, content, slug } = photo

  return (
    <Stack as="article" spacing="md" position="relative" className={className} style={style} {...rest}>
      <PostMeta date={date} category={category} />
      {header_image && (
        <Box as="section">
          <Link href="/photos/[...slug]" as={`/photos/${slug}`} passHref>
            <UnstyledAnchor>
              <PhotoWrapper image={header_image} />
            </UnstyledAnchor>
          </Link>
        </Box>
      )}
      {content && (
        <Stack as="section" spacing="md">
          {convert(content, { transform: htmrTransform })}
        </Stack>
      )}
    </Stack>
  )
}

export default PhotoListItem
