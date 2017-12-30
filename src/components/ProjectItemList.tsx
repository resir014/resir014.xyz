import * as React from 'react'
import styled from 'styled-components'

import ProjectItem from './ProjectItem'

import { photonColors, breakpoints } from '../utils/theme'
import { sectionHeading } from '../utils/mixins'
import { ProjectNode } from '../utils/types'

const ProjectSectionHeading = styled.h2`
  margin: 1.5rem 0;

  span {
    display: inline-block;
    margin: 0;
    padding: 0 .5rem;
    color: ${photonColors.white};
    background-color: ${photonColors.grey90};
  }
`

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${breakpoints.md} {
    flex-direction: row;
    border-bottom: 0;
  }
`

const ProjectEmpty = styled.p`
  color: ${photonColors.grey50};
`

export interface ProjectItemListProps {
  title: string
  projects: ProjectNode[]
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ title, projects }) => (
  <section>
    <ProjectSectionHeading><span>{title}</span></ProjectSectionHeading>
    {projects.length !== 0 ? (
      <ProjectsList>
        {projects.map(({ node }) => <ProjectItem key={node.frontmatter.title} node={node} />)}
      </ProjectsList>
    ) : (
      <ProjectEmpty>No projects.</ProjectEmpty>
    )}
  </section>
)

export default ProjectItemList
