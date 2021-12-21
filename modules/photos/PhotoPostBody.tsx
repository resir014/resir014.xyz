import * as React from 'react';
import convert from 'htmr';
import { Box, Stack } from '@resir014/chungking-react';

import PhotoWrapper from './PhotoWrapper';
import htmrTransform from '~/lib/htmr-transform';
import { Container, ContainerSizes } from '~/components/layout';

interface PhotoPostBodyProps {
  content?: string;
  image?: string;
  containerSize?: ContainerSizes;
}

const PhotoPostBody: React.FC<PhotoPostBodyProps> = ({
  content,
  containerSize = 'md',
  image,
  children,
}) => {
  if (content) {
    return (
      <Box as="section" p="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing="md">
            {image && <PhotoWrapper image={image} />}
            <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
              {convert(content, { transform: htmrTransform })}
            </div>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing="md">
          {image && <PhotoWrapper image={image} />}
          <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
            {children}
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhotoPostBody;
