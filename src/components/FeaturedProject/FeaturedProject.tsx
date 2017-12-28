import * as React from 'react'
import Link from 'gatsby-link'
import { merge } from 'glamor'
import styled, { css } from 'styled-components'
import * as Color from 'color'

import Button from '../Button'
import { Container } from '../Container'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { photonColors, headerColors, breakpoints } from '../../utils/theme'
import { highlightedText, sectionHeading } from '../../utils/mixins'
import { ProjectNode } from '../../utils/types'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

const featuredProjectHeadingClass = css({
  marginBottom: '.5rem',

  '& span': merge(highlightedText(photonColors.white, 0, '.25rem'), {
    color: photonColors.grey90,
  })
})

const featuredProjectNameClass = css(merge(sectionHeading(photonColors.white, 0, '.25rem')), {
  margin: '0 !important'
})

const featuredProjectDescriptionClass = css({
  marginTop: '1rem',
  marginBottom: '1rem',

  '& p': {
    margin: 0
  }
})

const goToProjectButton = css({
  marginTop: '1rem',

  '& a': {
    display: 'inline-block',
    padding: '.25rem .5rem',
    color: photonColors.white,
    border: `3px solid ${photonColors.white}`,

    '&:hover, &:focus': {
      color: photonColors.grey90,
      textDecoration: 'none',
      backgroundColor: photonColors.white
    }
  }
})

const FeaturedProjectWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
  color: ${photonColors.white};

  ${breakpoints.md} {
    flex-direction: row;
  }

  .column {
    flex: 1;
  }
`

const FeaturedProjectDetails = styled.div`
  padding: 1.5rem;
  background: linear-gradient(to bottom right,
    ${photonColors.blue50},
    ${photonColors.purple50});
`

const FeaturedProjectHeading = styled.div`
  span {
    display: inline-block;
    margin: 0;
    padding: 0 .25rem;
    color: ${photonColors.grey90};
    background-color: ${photonColors.white};
  }
`

const FeaturedProjectName = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 .25rem;
  color: ${photonColors.grey90};
  background-color: ${photonColors.white};
`

const FeaturedProjectDescription = styled.div`
  margin-top: 1rem;

  p {
    margin: 0;
  }
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
              <div className={`${goToProjectButton}`}>
                <Button elem="a" href="/test">Visit project</Button>
                <Link to={node.fields.slug}>Visit project</Link>
              </div>
            </div>
          </FeaturedProjectDetails>
        </FeaturedProjectWrapper>
      </Container>
    )
  }
}

export default FeaturedProject
