import { css } from '@emotion/core'
import convert from 'htmr'
import * as React from 'react'
import { Heading, Text, Badge, Box, BoxProps, AnchorButton } from '~/components/chungking-core'
import htmrTransform from '~/lib/htmr-transform'
import { ProjectMetadata } from '~/types/projects'

import ProjectTags from './ProjectTags'

interface ProjectCardProps extends BoxProps {
  project: ProjectMetadata
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, ...rest }) => {
  const { category, header_image, title, description, tags, project_url } = project
  return (
    <Box as="section" p={0} backgroundColor="ultramarine.500" borderRadius={8} overflow="hidden" boxShadow="single" {...rest}>
      {header_image && (
        <img
          loading="lazy"
          alt={title}
          src={header_image}
          css={css`
            margin: 0;
          `}
        />
      )}
      <Box p="lg">
        <Text
          variant={300}
          letterSpacing="0.01em"
          fontWeight={300}
          fontFamily="monospace"
          color="white"
          css={css`
            text-transform: uppercase;
          `}
        >
          Projects / {category}
        </Text>
        <Heading as="h1" variant={700} mt="xxs" mb="sm" color="turquoise.400" className="p-name">
          {title}
        </Heading>
        {description ? (
          <Text as="p" variant={400} fontWeight={300} m={0} className="p-summary">
            {convert(description, { transform: htmrTransform })}
          </Text>
        ) : null}
        {tags ? (
          <ProjectTags>
            {tags.map((tag) => (
              <Badge key={tag} className="p-category">
                {tag}
              </Badge>
            ))}
          </ProjectTags>
        ) : null}
        {project_url && (
          <Box mt="lg">
            <AnchorButton href={project_url} target="_blank" rel="noopener noreferrer" size="lg" ghosted>
              Go to project &rarr;
            </AnchorButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProjectCard
