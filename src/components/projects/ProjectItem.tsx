/* eslint-disable react/no-danger */
import * as React from 'react'
import styled from '@emotion/styled'
import convert from 'htmr'

import { ProjectField } from '../../types/fields'
import {
  Heading,
  Paragraph,
  colors,
  shadows,
  Badge,
  AnchorButton,
  NavLinkButton,
  Box,
  BoxProps
} from '../chungking-core'
import ProjectTags from './ProjectTags'

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

const renderLink = (url: string, jumpToProject = false) => {
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

const StyledProjectItem = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 100%;
  background-color: ${colors.grey90};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: ${shadows.single};
`

interface ProjectTitleProps {
  category: string
}

const ProjectHeader = styled('div')<ProjectTitleProps>`
  display: flex;
  flex-direction: row;
  padding: 12px 16px 0;
  border-top: 4px solid transparent;
  border-image-source: ${props => colorByCategory(props.category)};
  border-image-slice: 1;
`

const ProjectDetailBox = styled('div')`
  flex: 1 0 auto;
  padding: 8px 16px 24px;

  a {
    color: ${colors.green30};
  }
`

const ProjectFooter = styled('div')`
  padding: 0 16px 16px;
`

type ProjectFieldProps = ProjectField & BoxProps

const ProjectItem: React.SFC<ProjectFieldProps> = ({ node, ...rest }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
  const { title } = node.frontmatter
  const { description, lead, category, project_url, slug, jumpToProject } = node.fields

  return (
    <StyledProjectItem {...rest}>
      <ProjectHeader category={category}>
        <Heading as="h3" variant={700} m={0}>
          {title}
        </Heading>
      </ProjectHeader>
      <ProjectDetailBox>
        <Paragraph m={0}>{convert(description || lead)}</Paragraph>
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
