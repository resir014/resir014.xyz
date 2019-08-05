/* eslint-disable react/no-danger */
import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { colors, fonts, layerShadows } from '../../styles/variables'
import { ProjectField } from '../../types/fields'
import { Badge } from '../ui'

const colorByCategory = (category: string) => {
  switch (category) {
    case 'web':
      return `linear-gradient(to right, ${colors.magenta30}, ${colors.purple30})`
    case 'oss':
      return `linear-gradient(to right, ${colors.purple30}, ${colors.blue30})`
    case 'other':
      return `linear-gradient(to right, ${colors.magenta30}, ${colors.orange30})`
    default:
      return `linear-gradient(to right, ${colors.grey70}, ${colors.grey50})`
  }
}

const renderLink = (title: string, category: string, url: string, jumpToProject: boolean) => {
  if (jumpToProject) {
    return (
      <JumpToProjectLink href={url} target="_blank" rel="noopener noreferrer">
        <ProjectHeader category={category}>
          <ProjectTitle>{title} &rarr;</ProjectTitle>
        </ProjectHeader>
      </JumpToProjectLink>
    )
  }

  return (
    <ProjectLink to={url}>
      <ProjectHeader category={category}>
        <ProjectTitle>{title} &rarr;</ProjectTitle>
      </ProjectHeader>
    </ProjectLink>
  )
}

const StyledProjectItem = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 100%;
  height: 240px;
  margin-bottom: 2rem;
  background-color: ${colors.grey90};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};
`

const ProjectYear = styled('span')`
  display: inline-block;
  font-size: 1.25rem;
  font-family: ${fonts.sansSerif};
  color: ${colors.grey30};
`

const ProjectTitle = styled('h4')``

interface ProjectTitleProps {
  category: string
}

const ProjectHeader = styled('div')<ProjectTitleProps>`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background: ${props => colorByCategory(props.category)};

  ${ProjectTitle} {
    flex: 1 1 auto;
    margin: 0;
    color: ${colors.white};
  }
`

const UnstyledLink = css`
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const ProjectLink = styled(Link)(UnstyledLink)

const JumpToProjectLink = styled('a')(UnstyledLink)

const ProjectTags = styled('div')`
  ${Badge} + ${Badge} {
    margin-left: 8px;
  }
`

const ProjectDetailBox = styled('div')`
  flex: 1 0 auto;
  padding: 16px;

  p {
    margin: 0;
  }

  a {
    color: ${colors.green30};
  }
`

const ProjectFooter = styled('div')`
  margin-top: 8px;
  padding: 0 16px 16px;
`

const ProjectItem: React.SFC<ProjectField> = ({ node }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
  const { title } = node.frontmatter
  const { description, lead, category, year, project_url, slug, jumpToProject } = node.fields

  return (
    <StyledProjectItem>
      {jumpToProject === 'true' && project_url
        ? renderLink(title, category, project_url, true)
        : renderLink(title, category, slug, false)}
      <ProjectDetailBox>
        <ProjectYear>{year}</ProjectYear>
        <p
          dangerouslySetInnerHTML={{
            __html: description || lead
          }}
        />
      </ProjectDetailBox>
      <ProjectFooter>
        {tags ? (
          <ProjectTags>
            {tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </ProjectTags>
        ) : null}
      </ProjectFooter>
    </StyledProjectItem>
  )
}

export default ProjectItem
