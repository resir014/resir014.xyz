import { css } from '@emotion/react';
import Image from 'next/image';
import * as React from 'react';
import { Box } from '@resir014/chungking-react';

interface PostHeaderImageProps {
  src: string;
  alt?: string;
}

const PostHeaderImage: React.FC<PostHeaderImageProps> = ({ alt, src }) => {
  return (
    <Box as="section" px="lg">
      <div className="w-full lg:max-w-4xl xl:max-w-6xl mx-auto">
        <Image
          className="u-photo"
          loading="lazy"
          src={src}
          alt={alt}
          width={1140}
          height={580}
          css={css`
            object-fit: cover;
          `}
        />
      </div>
    </Box>
  );
};

export default PostHeaderImage;
