import * as React from 'react'
import * as classnames from 'classnames'

import { ProjectNode } from '../types'

import * as styles from './ProjectItem.module.scss'

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

export default ProjectItem
