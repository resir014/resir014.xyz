import * as React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import * as Color from 'color'

import Button from './Button'
import Container from './Container'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { colors, headerColors } from '../utils/theme'
import { ProjectField } from '../utils/types'
import mediaQueries from '../utils/mediaQueries'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

const FeaturedProjectWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
  color: ${colors.white};

  @media ${mediaQueries.md} {
    flex-direction: row;
  }

  .column {
    flex: 1;
  }
`

const FeaturedProjectDetails = styled.div`
  padding: 1.5rem;
  background: linear-gradient(to bottom right,
    ${colors.blue50},
    ${colors.purple50});
`

const FeaturedProjectHeading = styled.div`
  span {
    display: inline-block;
    margin: 0;
    padding: 0 .25rem;
    color: ${colors.grey90};
    background-color: ${colors.white};
  }
`

const FeaturedProjectName = styled.h3`
  display: inline-block;
  margin: 0;
  margin-top: .5rem;
  padding: 0 .25rem;
  color: ${colors.grey90};
  background-color: ${colors.white};
`

const FeaturedProjectDescription = styled.div`
  margin-top: 1rem;

  p {
    margin: 0;
  }
`

const FeaturedProjectFooter = styled.div`
  margin-top: 1rem;
`

interface FeaturedProjectProps extends ProjectField {}

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

  public componentWillMount() {
    this.setState({
      gradientStartIndex: Math.floor(Math.random() * headerColors.length),
      gradientEndIndex: Math.floor(Math.random() * headerColors.length)
    })
  }

  public render () {
    const { node } = this.props
    const { headerImage } = node.fields
    return (
      <Container>
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
