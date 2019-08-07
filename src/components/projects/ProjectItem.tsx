/* eslint-disable react/no-danger */
import * as React from 'react'
import styled from '@emotion/styled'

import { colors, layerShadows } from '../../styles/variables'
import { ProjectField } from '../../types/fields'
import { Badge, AnchorButton, NavLinkButton } from '../ui'

const colorByCategory = (category: string) => {
  switch (category) {
    case 'web':
      return `linear-gradient(to right, ${colors.ultramarine30}, ${colors.purple30})`
    case 'oss':
      return `linear-gradient(to right, ${colors.purple30}, ${colors.green30})`
    case 'other':
      return `linear-gradient(to right, ${colors.red30}, ${colors.orange30})`
    default:
      return `linear-gradient(to right, ${colors.grey70}, ${colors.grey50})`
  }
}

const renderLink = (url: string, jumpToProject: boolean = false) => {
  if (jumpToProject) {
    return (
      <AnchorButton ghosted href={url} target="_blank" rel="noopener noreferrer">
        Go to project &rarr;
      </AnchorButton>
    )
  }

  return (
    <NavLinkButton ghosted to={url}>
      Go to project &rarr;
    </NavLinkButton>
  )
}

const StyledProjectItem = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 100%;
  margin-bottom: 2rem;
  background-color: ${colors.grey90};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};
`

const ProjectTitle = styled('h3')``

interface ProjectTitleProps {
  category: string
}

const ProjectHeader = styled('div')<ProjectTitleProps>`
  display: flex;
  flex-direction: row;
  padding: 8px 16px 0;
  border-top: 4px solid transparent;
  border-image-source: ${props => colorByCategory(props.category)};
  border-image-slice: 1;

  ${ProjectTitle} {
    flex: 1 1 auto;
    margin: 0;
    color: ${colors.white};
  }
`

const ProjectTags = styled('div')`
  margin-top: 16px;

  ${Badge} + ${Badge} {
    margin-left: 8px;
  }
`

const ProjectDetailBox = styled('div')`
  flex: 1 0 auto;
  padding: 8px 16px 16px;

  p {
    margin: 0;
  }

  a {
    color: ${colors.green30};
  }
`

const ProjectFooter = styled('div')`
  padding: 0 16px 16px;
`

const ProjectItem: React.SFC<ProjectField> = ({ node }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
  const { title } = node.frontmatter
  const { description, lead, category, project_url, slug, jumpToProject } = node.fields

  return (
    <StyledProjectItem>
      <ProjectHeader category={category}>
        <ProjectTitle>{title}</ProjectTitle>
      </ProjectHeader>
      <ProjectDetailBox>
        <p
          dangerouslySetInnerHTML={{
            __html: description || lead
          }}
        />
        {tags ? (
          <ProjectTags>
            {tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </ProjectTags>
        ) : null}
      </ProjectDetailBox>
      <ProjectFooter>
        {jumpToProject === 'true' && project_url ? renderLink(project_url, true) : renderLink(slug)}
      </ProjectFooter>
    </StyledProjectItem>
  )
}

export default ProjectItem
