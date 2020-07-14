import * as React from 'react'
import { css } from '@emotion/core'

import { Box } from '../chungking-core'

interface PostThumbnailImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isHomepage?: boolean
}

const PostThumbnailImage: React.FC<PostThumbnailImageProps> = ({
  isHomepage,
  src,
  alt,
  srcSet,
  ...rest
}) => {
  return (
    <Box
      position="relative"
      m={0}
      borderRadius={6}
      height="100%"
      maxHeight={isHomepage ? 200 : undefined}
      overflow="hidden"
    >
      <img
        className="u-featured"
        src={src}
        alt={alt}
        srcSet={srcSet}
        css={css`
          height: 100%;
          width: 100%;
          margin: 0;
          object-fit: cover;
        `}
        {...rest}
      />
    </Box>
  )
}

export default PostThumbnailImage
