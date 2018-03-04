import * as React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import * as Color from 'color'

import Button from '../ui/Button'
import Container from '../ui/Container'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { colors } from '../../styles/variables'
import { ProjectNode } from '../../utils/types'
import { media } from '../../styles/mixins'

const FeaturedProjectWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
  color: ${transparentize(0.4, colors.white)};

  &:first-of-type {
    margin-top: 0;
  }

  ${media.md`
    flex-direction: row;
  `}

  .column {
    flex: 1;
  }
`

const FeaturedProjectDetails = styled.div`
  padding: 1.5rem;
  background: ${colors.ink90}
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
  p {
    margin: 0;
  }
`

const FeaturedProjectFooter = styled.div`
  margin-top: 1rem;
`

interface FeaturedProjectProps extends ProjectNode {}

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

  public render () {
    const { node } = this.props
    const { headerImage } = node.fields
    return (
      <Container size="xl">
        <FeaturedProjectWrapper>
          {
            headerImage
              ? <FeaturedProjectThumbnail className="column" image={headerImage} />
              : null
          }
          <FeaturedProjectDetails className="column">
            <FeaturedProjectHeading>
              <span>Featured project</span>
            </FeaturedProjectHeading>
            <div>
              <FeaturedProjectName>{node.frontmatter.title}</FeaturedProjectName>
              <FeaturedProjectDescription>
                <p>{node.fields.description}</p>
              </FeaturedProjectDescription>
              <FeaturedProjectFooter>
                <Button kind="nav-link" color="white" to={node.fields.slug}>Visit project</Button>
              </FeaturedProjectFooter>
            </div>
          </FeaturedProjectDetails>
        </FeaturedProjectWrapper>
      </Container>
    )
  }
}

export default FeaturedProject
