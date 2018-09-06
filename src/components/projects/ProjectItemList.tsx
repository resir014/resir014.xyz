import * as React from 'react'
import styled from 'react-emotion'

import ProjectItem from './ProjectItem'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ProjectField } from '../../types/fields'

const ProjectSectionHeading = styled('h2')`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-top: 3rem;
  }
`

const ProjectsList = styled('div')`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const ProjectEmpty = styled('p')`
  color: ${colors.grey50};
`

export interface ProjectItemListProps {
  title: string
  projects: ProjectField[]
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ title, projects }) => (
  <section>
    <ProjectSectionHeading>{title}</ProjectSectionHeading>
    {projects.length !== 0 ? (
      <ProjectsList>
        {projects.map(({ node }) => (
          <ProjectItem key={node.frontmatter.title} node={node} />
        ))}
      </ProjectsList>
    ) : (
      <ProjectEmpty>No projects.</ProjectEmpty>
    )}
  </section>
)

export default ProjectItemList
