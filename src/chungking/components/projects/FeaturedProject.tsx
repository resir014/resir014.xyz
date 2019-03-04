import * as React from 'react'
import styled from '@emotion/styled'

import { Button, Badge } from '../ui'
import { FeaturedProjectThumbnail } from './FeaturedProjectThumbnail'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ProjectField } from '../../../types/fields'

const FeaturedProjectWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  margin: 1.5rem 0;
  color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

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
  margin: 0.5rem 0 1rem;

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
  margin-top: 1rem;
`

interface FeaturedProjectProps extends ProjectField {
  className?: string
}

interface FeaturedProjectState {
  gradientStartIndex: number
  gradientEndIndex: number
}

export class FeaturedProject extends React.Component<FeaturedProjectProps, FeaturedProjectState> {
  constructor(props: FeaturedProjectProps) {
    super(props)
    this.state = {
      gradientStartIndex: 0,
      gradientEndIndex: 0
    }
  }

  public render() {
    const { node, className } = this.props
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
          {tags ? (
            <ProjectTags>
              {tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </ProjectTags>
          ) : null}
          <FeaturedProjectDescription>
            <p>{node.fields.description}</p>
          </FeaturedProjectDescription>
          <FeaturedProjectFooter>
            <Button kind="nav-link" color="white" to={node.fields.slug}>
              Visit project
            </Button>
          </FeaturedProjectFooter>
        </FeaturedProjectDetails>
      </FeaturedProjectWrapper>
    )
  }
}
