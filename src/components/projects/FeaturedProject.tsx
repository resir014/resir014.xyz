import * as React from 'react'
import styled from '@emotion/styled'

import { Button, Badge } from '../ui'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { colors, pxSizes, layerShadows } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ProjectField } from '../../types/fields'

const FeaturedProjectWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  margin: 1.5rem 0;
  color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};

  &:first-of-type {
    margin-top: 0;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin: 3rem 0;
  }

  .column {
    flex: 1;
  }
`

const ProjectTags = styled('div')`
  margin-top: 1rem;

  ${Badge} + ${Badge} {
    margin-left: 0.5rem;
  }
`

const FeaturedProjectDetails = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
`

const FeaturedProjectHeading = styled('div')`
  color: ${colors.white};
  margin: 0;
`

const FeaturedProjectSpan = styled('span')`
  font-size: 90%;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`

const FeaturedProjectName = styled('h3')`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #00f281;
`

const FeaturedProjectDescription = styled('div')`
  flex: 1;

  p {
    margin: 0;
  }
`

const FeaturedProjectFooter = styled('div')`
  margin-top: 2rem;
`

interface FeaturedProjectProps extends ProjectField {
  className?: string
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ node, className }) => {
  const { header_image } = node.frontmatter
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined

  return (
    <FeaturedProjectWrapper className={className}>
      {header_image ? <FeaturedProjectThumbnail className="column" image={header_image} /> : null}
      <FeaturedProjectDetails className="column">
        <FeaturedProjectHeading>
          <FeaturedProjectSpan>Featured project</FeaturedProjectSpan>
          <FeaturedProjectName>{node.frontmatter.title}</FeaturedProjectName>
        </FeaturedProjectHeading>
        <FeaturedProjectDescription>
          <p>{node.fields.description}</p>
          {tags ? (
            <ProjectTags>
              {tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </ProjectTags>
          ) : null}
        </FeaturedProjectDescription>
        <FeaturedProjectFooter>
          <Button kind="nav-link" ghosted size="lg" to={node.fields.slug}>
            Visit project &rarr;
          </Button>
        </FeaturedProjectFooter>
      </FeaturedProjectDetails>
    </FeaturedProjectWrapper>
  )
}

export default FeaturedProject
