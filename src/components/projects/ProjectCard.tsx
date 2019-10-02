import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { layerShadows } from '../../styles/variables'
import { ChildImageSharp } from '../../types/gatsby'

import { PageThumbnail, PageThumbnailImage } from '../page'
import { Badge } from '../ui'
import { Heading, Text, colors } from '../chungking-core'

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
        scale="trafalgar"
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
  margin: 1.5rem 0;
  padding: 0;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};
`

const Inner = styled('div')`
  padding: 1rem 1.5rem 1.5rem;
`

const ProjectTags = styled('div')`
  margin-top: 1rem;

  ${Badge} + ${Badge} {
    margin-left: 0.5rem;
  }
`
