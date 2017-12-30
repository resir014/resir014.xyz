import * as React from 'react'
import { css } from 'glamor'
import styled from 'styled-components'
import * as Color from 'color'

import Button from '../../Button'

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
})

const StyledProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  padding: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
  background-color: ${photonColors.grey20};

  ${breakpoints.md} {
    width: calc(50% - 1.5rem);
    margin: 1rem;

    &:nth-child(odd) {
      margin-left: 0;
    }

    &:nth-child(even) {
      margin-right: 0;
    }
  }
`

const ProjectTitle = styled.h3`
  margin-top: 0;
`

const ProjectYear = styled.span`
  display: inline-block;
  margin-left: 1rem;
  font-family: ${fonts.sansSerif};
  font-size: 70%;
  color: ${photonColors.grey50}
`

const ProjectTags = styled.div`
  span {
    display: inline-block;
    padding: .25em .5em;
    font-size: 85%;
    color: ${photonColors.white};
    background-color: ${photonColors.grey70};
    border-radius: 3px;
  }

  span + span {
    margin-left: .5rem;
  }
`

const ProjectDetailBox = styled.div`
  margin-top: 1rem;

  p {
    margin-top: 0;
  }
`

const ProjectFooter = styled.div`
  margin-top: auto;
`

const ProjectItem: React.SFC<ProjectNode> = ({ node }) => {
  const tags = node.fields.tags ? JSON.parse(node.fields.tags) as string[] : undefined
  return (
    <StyledProjectItem>
      <ProjectTitle>
        {node.frontmatter.title}
        <ProjectYear>{node.fields.year}</ProjectYear>
      </ProjectTitle>
      {tags ? (
        <ProjectTags>
          {tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </ProjectTags>
      ) : null}
      <ProjectDetailBox>
        <p dangerouslySetInnerHTML={{ __html: node.fields.description || node.fields.lead }} />
      </ProjectDetailBox>
      <ProjectFooter>
        {node.fields.jumpToProject === 'true' && node.fields.project_url
          ? renderLink(node.fields.project_url, true)
          : renderLink(node.fields.slug, false)}
      </ProjectFooter>
    </StyledProjectItem>
  )
}

const renderLink = (url: string, jumpToProject: boolean) => (
  <Button
    kind="link"
    color="primary"
    href={url}
    target={jumpToProject ? '_blank' : null}
    rel={jumpToProject ? 'noopener noreferrer' : null}
  >
    Visit project
  </Button>
)

export default ProjectItem
