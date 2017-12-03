import * as React from 'react'
import { css, merge } from 'glamor'

import { WidgetLinkButton } from '../WidgetLinkButton'
import { ProjectItem } from './ProjectItem'

import { photonColors, breakpoints } from '../../utils/theme'
import { sectionHeading } from '../../utils/mixins'
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

const sectionHeadingClass = css(merge(sectionHeading(photonColors.grey90), {
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  color: photonColors.white
}))

export interface ProjectItemListProps {
  title: string
  projects: ProjectNode[]
}

const ProjectItemList: React.SFC<ProjectItemListProps> = ({ title, projects }) => (
  <section>
    <h2>
      <span className={`${sectionHeadingClass}`}>{title}</span>
    </h2>
    {
      projects.length !== 0
        ? <div className={`${projectsListClass}`}>
          {projects.map(({ node }) => <ProjectItem key={node.frontmatter.title} node={node} />)}
        </div>
        : <p style={{ color: photonColors.grey50 }}>No projects.</p>
    }
  </section>
)

export default ProjectItemList
