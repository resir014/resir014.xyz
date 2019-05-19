import * as React from 'react'
import styled from '@emotion/styled'

import ProjectItem from './ProjectItem'

import { colors } from '../../styles/variables'
import { ProjectField } from '../../types/fields'

const ProjectSectionHeading = styled('h2')`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

const ProjectsList = styled('div')`
  display: flex;
  flex-wrap: wrap;
`

const ProjectEmpty = styled('p')`
  color: ${colors.grey50};
`

export interface ProjectItemListProps {
  title?: string
  projects: ProjectField[]
  homepage?: boolean
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ title, homepage, projects }) => {
  if (projects && projects.length !== 0) {
    const slicedProjects = homepage ? projects.slice(0, 9) : projects

    return (
      <React.Fragment>
        {title && <ProjectSectionHeading>{title}</ProjectSectionHeading>}
        <ProjectsList>
          {slicedProjects.map(({ node }) => (
            <ProjectItem key={node.frontmatter.title} node={node} />
          ))}
        </ProjectsList>
      </React.Fragment>
    )
  }

  return <ProjectEmpty>No projects.</ProjectEmpty>
}

export default ProjectItemList
