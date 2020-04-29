import * as React from 'react'
import styled from '@emotion/styled'

import ProjectItem from './ProjectItem'

import { ProjectField } from '../../types/fields'
import { Heading, colors, Stack, Box, BoxProps } from '../chungking-core'

const ProjectEmpty = styled('p')`
  color: ${colors.grey50};
`

export interface ProjectItemListProps extends BoxProps {
  title?: string
  projects: ProjectField[]
  homepage?: boolean
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({
  title,
  homepage,
  projects,
  ...rest
}) => {
  if (projects && projects.length !== 0) {
    const slicedProjects = homepage ? projects.slice(0, 9) : projects

    return (
      <Box {...rest}>
        {title && (
          <Heading as="h2" variant={800} mb="lg">
            {title}
          </Heading>
        )}
        <Stack spacing="lg">
          {slicedProjects.map(({ node }) => (
            <ProjectItem key={node.frontmatter.title} node={node} />
          ))}
        </Stack>
      </Box>
    )
  }

  return <ProjectEmpty>No projects.</ProjectEmpty>
}

export default ProjectItemList
