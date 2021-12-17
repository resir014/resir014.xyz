import * as React from 'react';
import styled from '@emotion/styled';

import { Heading, theme, Stack, Box, BoxProps } from '@resir014/chungking-react';
import ProjectItem from './ProjectItem';
import { ProjectMetadata } from '~/types/projects';

const ProjectEmpty = styled('p')`
  color: ${theme.colors.grey[400]};
`;

export interface ProjectItemListProps extends BoxProps {
  title?: string;
  projects: ProjectMetadata[];
}

const ProjectItemList: React.FC<ProjectItemListProps> = ({ title, projects, ...rest }) => {
  if (projects.length !== 0) {
    return (
      <Box {...rest}>
        {title && (
          <Heading as="h2" variant="3xl" mb="lg">
            {title}
          </Heading>
        )}
        <Stack spacing="lg">
          {projects.map(project => (
            <ProjectItem key={project.slug} project={project} />
          ))}
        </Stack>
      </Box>
    );
  }

  return <ProjectEmpty>No projects.</ProjectEmpty>;
};

export default ProjectItemList;
