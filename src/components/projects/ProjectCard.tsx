import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { ChildImageSharp } from '../../types/gatsby'

import { PageThumbnail, PageThumbnailImage } from '../page'
import { Heading, Text, colors, shadows, space, Badge } from '../chungking-core'

interface ProjectCardProps {
  title: string
  description?: string
  tags?: string[]
  image?: {
    childImageSharp: ChildImageSharp
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags }) => (
  <Root>
    {image && (
      <PageThumbnail>
        <PageThumbnailImage fluid={image.childImageSharp.fluid} alt={title} />
      </PageThumbnail>
    )}
    <Inner>
      <Heading
        as="h1"
        scale="canon"
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
        <Text as="p" scale="greatPrimer" fontWeight={300} m={0} className="p-summary">
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

const Root = styled('section')`
  margin: 24px 0;
  padding: 0;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${shadows.single};
`

const Inner = styled('div')`
  padding: ${space.md}px ${space.lg}px ${space.lg}px;
`

const ProjectTags = styled('div')`
  margin-top: ${space.md}px;

  ${Badge} + ${Badge} {
    margin-left: ${space.xs}px;
  }
`
