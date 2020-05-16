import * as React from 'react'

import { ChildImageSharp } from '../../types/gatsby'

import { PageThumbnail, PageThumbnailImage } from '../page'
import { Heading, Text, Badge, Box, BoxProps } from '../chungking-core'
import ProjectTags from './ProjectTags'

interface ProjectCardProps extends BoxProps {
  title: string
  description?: string
  tags?: string[]
  image?: {
    childImageSharp: ChildImageSharp
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags, ...rest }) => (
  <Box
    as="section"
    p={0}
    backgroundColor="ultramarine30"
    borderRadius={8}
    overflow="hidden"
    boxShadow="single"
    {...rest}
  >
    {image && (
      <PageThumbnail>
        <PageThumbnailImage fluid={image.childImageSharp.fluid} alt={title} />
      </PageThumbnail>
    )}
    <Box p="lg" pt="md">
      <Heading as="h1" variant={900} mt={0} mb="xs" color="green30" className="p-name">
        {title}
      </Heading>
      {description ? (
        <Text as="p" variant={500} fontWeight={300} m={0} className="p-summary">
          {description}
        </Text>
      ) : null}
      {tags ? (
        <ProjectTags>
          {tags.map(tag => (
            <Badge key={tag} className="p-category">
              {tag}
            </Badge>
          ))}
        </ProjectTags>
      ) : null}
    </Box>
  </Box>
)

export default ProjectCard
