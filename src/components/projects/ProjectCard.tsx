import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { ChildImageSharp } from '../../types/gatsby'

import { PageThumbnail, PageThumbnailImage } from '../page'
import { Heading, Text, colors, shadows, space, Badge, Box, BoxProps } from '../chungking-core'
import ProjectTags from './ProjectTags'

interface ProjectCardProps extends BoxProps {
  title: string
  description?: string
  tags?: string[]
  image?: {
    childImageSharp: ChildImageSharp
  }
}

const Root = styled(Box)`
  padding: 0;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${shadows.single};
`

const Inner = styled('div')`
  padding: ${space.md}px ${space.lg}px ${space.lg}px;
`

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags, ...rest }) => (
  <Root as="section" {...rest}>
    {image && (
      <PageThumbnail>
        <PageThumbnailImage fluid={image.childImageSharp.fluid} alt={title} />
      </PageThumbnail>
    )}
    <Inner>
      <Heading
        as="h1"
        variant={900}
        mt={0}
        mb="xs"
        css={css`
          color: #00f281;
        `}
        className="p-name"
      >
        {title}
      </Heading>
      {description ? (
        <Text as="p" scale={500} fontWeight={300} m={0} className="p-summary">
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
    </Inner>
  </Root>
)

export default ProjectCard
