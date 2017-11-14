import * as React from 'react'
import { css } from 'glamor'
import * as Color from 'color'

import { breakpoints, widths, colors, fonts } from '../../../utils/theme'
import { ProjectNode } from '../../../utils/types'

const projectItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  position: 'relative',
  paddingTop: '1rem',
  paddingBottom: '1rem',

  [breakpoints.md]: {
    width: 'calc(50% - 1.5rem)',
    margin: '0 auto',

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
    color: colors.gray2
  },

  '& .project__tags': {
    '& span': {
      display: 'inline-block',
      padding: '.25em .75em',
      fontSize: '85%',
      color: colors.white,
      backgroundColor: Color(colors.black).lighten(0.15).hex(),
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
    }
  },

  '& .project__footer': {
    marginTop: 'auto'
  },

  '& .project__footer-link': {
    display: 'inline-block',
    marginTop: 'auto',
    padding: '.25rem .5rem',
    border: `2px solid ${colors.neonblue2}`,

    '&:hover, &:focus': {
      color: colors.white,
      borderColor: colors.neonblue3,
      backgroundColor: colors.neonblue3,
      textDecoration: 'none'
    }
  }
})

const ProjectItem: React.SFC<ProjectNode> = ({ node }) => (
  <div className={`${projectItemClass}`}>
    <h3 className="project__title">
      {node.title}
      <span className="project__year">{node.year}</span>
    </h3>
    <div className="project__tags">
      {node.tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
    <div className="project__detail-box">
      <p dangerouslySetInnerHTML={{ __html: node.details }} />
    </div>
    <div className="project__footer">
      <a className="project__footer-link" href={node.url}>Visit project</a>
    </div>
  </div>
)

export default ProjectItem
