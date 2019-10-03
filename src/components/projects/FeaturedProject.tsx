import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Badge, NavLinkButton } from '../ui'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { ProjectField } from '../../types/fields'
import { Text, Heading, P, breakpoints, colors, layerShadows } from '../chungking-core'

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

  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
  }

  @media (min-width: ${breakpoints.lg}px) {
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
          <Text
            scale="longPrimer"
            letterSpacing="0.01em"
            fontWeight={300}
            css={css`
              text-transform: uppercase;
            `}
          >
            Featured project
          </Text>
          <Heading
            as="h3"
            scale="paragon"
            mt="xxs"
            mb="sm"
            css={css`
              color: #00f281;
            `}
          >
            {node.frontmatter.title}
          </Heading>
        </FeaturedProjectHeading>
        <FeaturedProjectDescription>
          <P>{node.fields.description}</P>
          {tags ? (
            <ProjectTags>
              {tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </ProjectTags>
          ) : null}
        </FeaturedProjectDescription>
        <FeaturedProjectFooter>
          <NavLinkButton ghosted size="lg" to={node.fields.slug}>
            Visit project &rarr;
          </NavLinkButton>
        </FeaturedProjectFooter>
      </FeaturedProjectDetails>
    </FeaturedProjectWrapper>
  )
}

export default FeaturedProject
