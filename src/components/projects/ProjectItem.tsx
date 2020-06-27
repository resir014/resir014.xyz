/* eslint-disable react/no-danger */
import * as React from 'react'
import styled from '@emotion/styled'
import convert from 'htmr'
import { transparentize } from 'polished'

import { ProjectField } from '../../types/fields'
import {
  Heading,
  Paragraph,
  colors,
  shadows,
  Badge,
  AnchorButton,
  NavLinkButton,
  BoxProps,
  Card
} from '../chungking-core'
import ProjectTags from './ProjectTags'

const colorByCategory = (category: string) => {
  switch (category) {
    case 'portfolio':
      return `${colors.ultramarine30}`
    case 'oss':
      return `${colors.purple30}`
    case 'other':
      return `${colors.red30}`
    default:
      return `${colors.grey90}`
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

interface ProjectItemProps {
  category: string
}

const ProjectHeader = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 12px 16px 0;
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

const ProjectItem: React.FC<ProjectFieldProps> = ({ node, ...rest }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
  const { title } = node.frontmatter
  const { description, lead, category, project_url, slug, jumpToProject } = node.fields

  return (
    <Card
      elevation="single"
      display="flex"
      flexDirection="column"
      position="relative"
      flex="1 1 100%"
      backgroundColor={transparentize(0.75, colorByCategory(category))}
      border="2px solid"
      borderColor={colorByCategory(category)}
      borderRadius={6}
      overflow="hidden"
      {...rest}
    >
      <ProjectHeader>
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
    </Card>
  )
}

export default ProjectItem
