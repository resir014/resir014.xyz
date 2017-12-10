import * as React from 'react'
import { css } from 'glamor'
import * as Color from 'color'

import { breakpoints, widths, photonColors, fonts, sharedStyles } from '../../../utils/theme'
import { ProjectNode } from '../../../utils/types'

const projectItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  position: 'relative',
  padding: '1rem',
  marginTop: '0',
  marginBottom: '2rem',
  backgroundColor: photonColors.grey20,

  [breakpoints.md]: {
    width: 'calc(50% - 1.5rem)',
    margin: '1rem',

    '&:nth-child(odd)': {
      marginLeft: 0
    },

    '&:nth-child(even)': {
      marginRight: 0
    }
  },

  '& .project__title': {
    marginTop: 0
  },

  '& .project__year': {
    display: 'inline-block',
    marginLeft: '1rem',
    fontFamily: fonts.sansSerif,
    fontSize: '70%',
    color: photonColors.grey50
  },

  '& .project__tags': {
    '& span': {
      display: 'inline-block',
      padding: '.25em .5em',
      fontSize: '85%',
      color: photonColors.white,
      backgroundColor: photonColors.grey70,
      borderRadius: '3px',
    },

    '& span + span': {
      marginLeft: '.5rem'
    }
  },

  '& .project__detail-box': {
    marginTop: '1rem',

    '& p': {
      marginTop: 0
    },

    '& a': sharedStyles.link
  },

  '& .project__footer': {
    marginTop: 'auto'
  },

  '& .project__footer-link': sharedStyles.sectionFooterLink
})

const ProjectItem: React.SFC<ProjectNode> = ({ node }) => {
  const tags = node.fields.tags ? JSON.parse(node.fields.tags) as string[] : undefined
  return (
    <div className={`${projectItemClass}`}>
      <h3 className="project__title">
        {node.frontmatter.title}
        <span className="project__year">{node.fields.year}</span>
      </h3>
      {
        tags
          ? <div className="project__tags">
            {tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          : null
      }
      <div className="project__detail-box">
        <p dangerouslySetInnerHTML={{ __html: node.fields.description || node.fields.lead }} />
      </div>
      <div className="project__footer">
        {node.fields.jumpToProject === 'true' && node.fields.project_url
          ? renderLink(node.fields.project_url, true)
          : renderLink(node.fields.slug, false)}
      </div>
    </div>
  )
}

const renderLink = (url: string, jumpToProject: boolean) => (
  <a
    className="project__footer-link"
    href={url}
    target={jumpToProject ? '_blank' : null}
    rel={jumpToProject ? 'noopener noreferrer' : null}
  >
    Visit project
  </a>
)

export default ProjectItem
