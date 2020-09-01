/* eslint-disable react/no-danger */
import * as React from 'react'
import { css } from '@emotion/core'
import convert from 'htmr'

import { ProjectField } from '../../types/fields'
import {
  Heading,
  Paragraph,
  colors,
  Badge,
  AnchorButton,
  BoxProps,
  Card,
  Text,
  Box
} from '../chungking-core'
import { NavLinkButton } from '../ui'
import ProjectTags from './ProjectTags'

const colorByCategory = (category: string) => {
  switch (category) {
    case 'portfolio':
      return `${colors.green30}`
    case 'oss':
      return `${colors.orange30}`
    case 'other':
      return `${colors.magenta30}`
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
      backgroundColor="grey90"
      borderRadius={6}
      overflow="hidden"
      {...rest}
    >
      <Box display="flex" flexDirection="column" px="lg" pt="lg" pb={0}>
        <Text
          variant={200}
          display="block"
          fontFamily="monospace"
          fontWeight={300}
          mb="xxs"
          css={css`
            text-transform: uppercase;
          `}
        >
          {category}
        </Text>
        <Heading as="h3" variant={700} m={0} color={colorByCategory(category)}>
          {title}
        </Heading>
      </Box>
      <Box flex="1 0 auto" pb="lg" px="lg" pt="sm">
        <Paragraph m={0}>{convert(description || lead)}</Paragraph>
        {tags ? (
          <ProjectTags>
            {tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </ProjectTags>
        ) : null}
      </Box>
      <Box pt={0} px="lg" pb="lg">
        {jumpToProject === 'true' && project_url ? renderLink(project_url, true) : renderLink(slug)}
      </Box>
    </Card>
  )
}

export default ProjectItem
