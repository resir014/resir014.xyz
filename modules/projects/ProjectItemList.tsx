import * as React from 'react'
import styled from '@emotion/styled'

import { Heading, colors, Stack, Box, BoxProps } from '~/components/chungking-core'
import { ProjectMetadata } from '~/types/projects'

import ProjectItem from './ProjectItem'

const ProjectEmpty = styled('p')`
  color: ${colors.grey50};
`

export interface ProjectItemListProps extends BoxProps {
  title?: string
  projects: ProjectMetadata[]
}

const ProjectItemList: React.FC<ProjectItemListProps> = ({ title, projects, ...rest }) => {
  if (projects && projects.length !== 0) {
    return (
      <Box {...rest}>
        {title && (
          <Heading as="h2" variant={800} mb="lg">
            {title}
          </Heading>
        )}
        <Stack spacing="lg">
          {projects.map((project) => (
            <ProjectItem key={project.slug} project={project} />
          ))}
        </Stack>
      </Box>
    )
  }

  return <ProjectEmpty>No projects.</ProjectEmpty>
}

export default ProjectItemList
