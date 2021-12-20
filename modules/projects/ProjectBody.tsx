import * as React from 'react';
import convert from 'htmr';

import { Box } from '@resir014/chungking-react';
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
          <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
            {convert(content, { transform: htmrTransform })}
          </div>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="section" pt="xxl" px="lg" pb={96}>
      <Container size={containerSize}>
        <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
          {children}
        </div>
      </Container>
    </Box>
  );
};

export default ProjectBody;
