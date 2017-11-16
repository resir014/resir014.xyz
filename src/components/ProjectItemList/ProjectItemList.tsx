import * as React from 'react'
import { css } from 'glamor'

import { WidgetLinkButton } from '../WidgetLinkButton'
import { ProjectItem } from './ProjectItem'

import { photonColors, breakpoints } from '../../utils/theme'
import { ProjectNode } from '../../utils/types'

const projectsListClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderBottom: `2px solid ${photonColors.grey90}`,

  [breakpoints.md]: {
    flexDirection: 'row',
    borderBottom: 0
  },

  '> div': {
    borderTop: `2px solid ${photonColors.grey90}`
  }
})

export interface ProjectItemListProps {
  projects: ProjectNode[]
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ projects }) => (
  <div className={`${projectsListClass}`}>
    {projects.map(({ node }) => <ProjectItem key={node.title} node={node} />)}
  </div>
)

export default ProjectItemList
