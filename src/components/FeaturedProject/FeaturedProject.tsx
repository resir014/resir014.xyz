import * as React from 'react'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'
import * as Color from 'color'

import { Container } from '../Container'
import { WidgetLinkButton } from '../WidgetLinkButton'

import { photonColors, headerColors, breakpoints } from '../../utils/theme'
import { highlightedText, sectionHeading } from '../../utils/mixins'
import { ProjectNode } from '../../utils/types'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

const featuredProjectClass = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',
  marginBottom: '3rem',
  color: photonColors.white,

  [breakpoints.md]: {
    flexDirection: 'row'
  },

  '& .column': {
    flex: 1
  }
})

const featuredProjectThumbnailClass = css({
  display: 'none',

  [breakpoints.md]: {
    display: 'block',
  },

  '& img': {
    margin: 0,
    verticalAlign: 'middle',
    objectFit: 'cover'
  }
})

const featuredProjectDetailsClass = css({
  padding: '1.5rem',
  background: `linear-gradient(to bottom right,
    ${photonColors.blue50},
    ${photonColors.purple50})`,
})

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

const projectImage = (state: FeaturedProjectState, headerImage?: string) => {
  if (headerImage) {
    return css({
      backgroundImage: `url(${headerImage})`,
      backgroundSize: 'cover',
      backgroundPositionY: 'center'
    })
  }
}

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
        <section className={`${featuredProjectClass}`}>
          {
            headerImage
              ? <div className={`column ${featuredProjectThumbnailClass} ${projectImage(this.state, headerImage)}`} />
              : null
          }
          <div className={`column ${featuredProjectDetailsClass}`}>
            <div className={`${featuredProjectHeadingClass}`}>
              <span>Featured project</span>
            </div>
            <div>
              <h3 className={`${featuredProjectNameClass}`}>{node.frontmatter.title}</h3>
              <div className={`${featuredProjectDescriptionClass}`}>
                <p>{node.fields.description}</p>
              </div>
              <div className={`${goToProjectButton}`}>
                <Link to={node.fields.slug}>Visit project</Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    )
  }
}

export default FeaturedProject
