import * as React from 'react';
import convert from 'htmr';

import { Box, Stack } from '@resir014/chungking-react';
import { Container, ContainerSizes } from '~/components/layout';
import htmrTransform from '~/lib/htmr-transform';

interface ProjectBodyProps {
  content?: string;
  containerSize?: ContainerSizes;
  projectLink?: string;
}

const ProjectBody: React.FC<ProjectBodyProps> = ({ content, containerSize = 'md', children }) => {
  if (content) {
    return (
      <Box as="section" pt="xxl" px="lg" pb={96}>
        <Container size={containerSize}>
          <Stack spacing="md">{convert(content, { transform: htmrTransform })}</Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="section" pt="xxl" px="lg" pb={96}>
      <Container size={containerSize}>
        <Stack spacing="md">{children}</Stack>
      </Container>
    </Box>
  );
};

export default ProjectBody;
