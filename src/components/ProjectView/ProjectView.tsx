import * as React from 'react'
import * as classnames from 'classnames'

import WidgetLinkButton from '../WidgetLinkButton/WidgetLinkButton'
import ProjectItem from './ProjectItem/ProjectItem'

import { ProjectNode } from './types'

const styles = require('./ProjectView.module.scss')

export interface ProjectViewProps {
  projects: ProjectNode[]
}

const ProjectView: React.SFC<ProjectViewProps> = ({ projects }) => (
  <div className={classnames(styles.root)}>
    <h2 className={styles.sectionTitle}>Projects</h2>
    <div className={classnames(styles.projectItemList)}>
      {projects.map(({ node }) => <ProjectItem key={node.title} node={node} />)}
    </div>
    <WidgetLinkButton
      href="https://resir014.github.io/projects"
      target="_blank"
    >
      More projects<br />(on resir014.github.io)
    </WidgetLinkButton>
  </div>
)

export default ProjectView
