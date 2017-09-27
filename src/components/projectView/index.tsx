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
  <div className={styles.projectItem}>
    <h3 className={styles.projectName}>
      {node.title}
      <span className={styles.projectYear}>{node.year}</span>
    </h3>
    {node.languages.map(language => (
      <span className={styles.projectLanguage} key={language}>{language}</span>
    ))}
    <div className={styles.projectDetailBox}>
      <p
        className={styles.projectDetails}
        dangerouslySetInnerHTML={{ __html: node.details }}
      />
      <a className={styles.projectLink} href={node.url} target="_blank">Go to project</a>
    </div>
  </div>
)

const ProjectView: React.SFC<ProjectsListProps> = ({ projects }) => (
  <div className={classnames(styles.root)}>
    <h2 className={styles.sectionTitle}>Projects</h2>
    <div className={styles.projectItemList}>
      {projects.map(({ node }) => <ProjectItem key={node.title} node={node} />)}
    </div>
    <WidgetLinkButton
      url="https://resir014.github.io/projects"
      newtab={true}
    >
      More projects
    </WidgetLinkButton>
  </div>
)

export default ProjectView
