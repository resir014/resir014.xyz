import * as React from 'react'
import styled from 'react-emotion'

import Button from '../ui/Button'
import Container from '../ui/Container'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ProjectField } from '../../types/fields'

const FeaturedProjectWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  color: ${colors.grey20};
  border-radius: 4px;
  overflow: hidden;

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

  span {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 85%;
    color: ${colors.ink80};
    background-color: ${colors.grey30};
    border-radius: 3px;
  }

  span + span {
    margin-left: 0.5rem;
  }
`

const FeaturedProjectDetails = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: linear-gradient(to bottom right, ${colors.ink90}, ${colors.ink70});
`

const FeaturedProjectHeading = styled('div')`
  color: ${colors.white};
  margin: 0;
`

const FeaturedProjectName = styled('h3')`
  margin-top: 0;
  color: ${colors.white};
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

class FeaturedProject extends React.Component<FeaturedProjectProps, FeaturedProjectState> {
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
      <Container size="xl">
        <FeaturedProjectWrapper className={className}>
          {header_image ? (
            <FeaturedProjectThumbnail className="column" image={header_image} />
          ) : null}
          <FeaturedProjectDetails className="column">
            <FeaturedProjectHeading>
              <span>Featured project</span>
              <FeaturedProjectName>{node.frontmatter.title}</FeaturedProjectName>
            </FeaturedProjectHeading>
            {tags ? (
              <ProjectTags>
                {tags.map(tag => (
                  <span key={tag}>{tag}</span>
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
      </Container>
    )
  }
}

export default FeaturedProject
