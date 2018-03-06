import * as React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import Button from '../ui/Button'
import Container from '../ui/Container'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { colors } from '../../styles/variables'
import { ProjectField } from '../../utils/types'
import { media } from '../../styles/mixins'

const FeaturedProjectWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  color: ${transparentize(0.4, colors.white)};

  &:first-of-type {
    margin-top: 0;
  }

  ${media.md`
    flex-direction: row;
  `} ${media.lg`
    margin: 3rem 0;
  `}

  .column {
    flex: 1;
  }
`

const ProjectTags = styled.div`
  margin: 0.5rem 0 1rem;

  span {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 85%;
    color: ${colors.white};
    background-color: ${colors.ink70};
    border-radius: 3px;
  }

  span + span {
    margin-left: 0.5rem;
  }
`

const FeaturedProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: ${colors.ink90};
`

const FeaturedProjectHeading = styled.div`
  color: ${colors.white};
  margin: 0;
`

const FeaturedProjectName = styled.h3`
  margin-top: 0;
  color: ${colors.white};
`

const FeaturedProjectDescription = styled.div`
  flex: 1;

  p {
    margin: 0;
  }
`

const FeaturedProjectFooter = styled.div`
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
              <ProjectTags>{tags.map(tag => <span key={tag}>{tag}</span>)}</ProjectTags>
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
