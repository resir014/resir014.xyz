import * as React from 'react'
import * as classnames from 'classnames'

import WidgetLinkButton from '../WidgetLinkButton/WidgetLinkButton'
import ProjectItem from './ProjectItem/ProjectItem'

import { ProjectNode } from './types'

import * as styles from './ProjectItemList.module.scss'

export interface ProjectItemListProps {
  projects: ProjectNode[]
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ projects }) => (
  <div className={classnames(styles.projectItemList)}>
    {projects.map(({ node }) => <ProjectItem key={node.title} node={node} />)}
  </div>
)

export default ProjectItemList
