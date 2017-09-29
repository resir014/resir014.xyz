import * as React from 'react'
import * as classnames from 'classnames'

import WidgetLinkButton from '../widgetLinkButton'

const styles = require('./styles.module.scss')

export interface ProjectNode {
  node: {
    title: string
    year: string
    languages: string[]
    details: string
    url: string
  }
}

export interface ProjectsListProps {
  projects: ProjectNode[]
}

const ProjectItem: React.SFC<ProjectNode> = ({ node }) => (
  <div className={classnames(styles.projectItem)}>
    <h3 className={styles.projectName}>
      {node.title}
      <span className={styles.projectYear}>{node.year}</span>
    </h3>
    <div className={styles.projectLanguage}>
      {node.languages.map(language => (
        <span key={language}>{language}</span>
      ))}
    </div>
    <div className={styles.projectDetailBox}>
      <p
        className={styles.projectDetails}
        dangerouslySetInnerHTML={{ __html: node.details }}
      />
    </div>
    <div className={styles.projectFooter}>
      <a className={styles.projectLink} href={node.url} target="_blank">Visit project</a>
    </div>
  </div>
)

const ProjectView: React.SFC<ProjectsListProps> = ({ projects }) => (
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
