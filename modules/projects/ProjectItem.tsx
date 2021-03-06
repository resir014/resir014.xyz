/* eslint-disable react/no-danger */
import * as React from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import convert from 'htmr'
import { Heading, Paragraph, theme, Badge, Anchor, BoxProps, Card, Text, Box } from '@resir014/chungking-react'
import htmrTransform from '~/lib/htmr-transform'
import { ProjectMetadata } from '~/types/projects'

import ProjectTags from './ProjectTags'

const colorByCategory = (category: string) => {
  switch (category) {
    case 'portfolio':
      return `${theme.colors.turquoise[400]}`
    case 'oss':
      return `${theme.colors.orange[400]}`
    case 'other':
      return `${theme.colors.magenta[400]}`
    default:
      return `${theme.colors.grey[900]}`
  }
}

interface ProjectFieldProps extends BoxProps {
  project: ProjectMetadata
}

const ProjectItem: React.FC<ProjectFieldProps> = ({ project, ...rest }) => {
  const { title, description, category, tags, slug } = project

  return (
    <Card
      elevation="single"
      display="flex"
      flexDirection="column"
      position="relative"
      flex="1 1 100%"
      backgroundColor="grey.900"
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
        <Paragraph m={0}>{convert(description || '', { transform: htmrTransform })}</Paragraph>
        {tags ? (
          <ProjectTags>
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </ProjectTags>
        ) : null}
      </Box>
      <Box pt={0} px="lg" pb="lg">
        <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
          <Anchor>Go to project &rarr;</Anchor>
        </Link>
      </Box>
    </Card>
  )
}

export default ProjectItem
