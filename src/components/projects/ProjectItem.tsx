import * as React from 'react'
import styled from 'react-emotion'

import Button from '../ui/Button'

import { colors, fonts, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ProjectField } from '../../types/fields'

const StyledProjectItem = styled('div')`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  padding: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
  background-color: ${colors.grey20};

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex: 1;
  }
`

const ProjectTitle = styled('h3')`
  margin-top: 0;
`

const ProjectYear = styled('span')`
  display: inline-block;
  margin-left: 1rem;
  font-family: ${fonts.sansSerif};
  font-size: 70%;
  color: ${colors.grey50};
`

const ProjectTags = styled('div')`
  span {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 85%;
    color: ${colors.white};
    background-color: ${colors.grey70};
    border-radius: 3px;
  }

  span + span {
    margin-left: 0.5rem;
  }
`

const ProjectDetailBox = styled('div')`
  margin-top: 1rem;

  p {
    margin-top: 0;
  }
`

const ProjectFooter = styled('div')`
  margin-top: auto;
`

const ProjectItem: React.SFC<ProjectField> = ({ node }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
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
        <p
          dangerouslySetInnerHTML={{
            __html: node.fields.description || node.fields.lead
          }}
        />
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
    target={jumpToProject ? '_blank' : undefined}
    rel={jumpToProject ? 'noopener noreferrer' : undefined}
  >
    Visit project
  </Button>
)

export default ProjectItem
