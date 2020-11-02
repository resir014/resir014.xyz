import clsx from 'clsx'
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
    <Stack as="article" spacing="md" position="relative" className={clsx('h-entry', className)} style={style} {...rest}>
      <PostMeta date={date} category={category} slug={slug} />
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
        <Stack as="section" className="e-content" spacing="md">
          {convert(content, { transform: htmrTransform })}
        </Stack>
      )}
    </Stack>
  )
}

export default PhotoListItem
