import * as React from 'react'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Widget } from '../components/Widget'

import { colors, headerColors, breakpoints, widths } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'
import flavorText from '../utils/flavorText'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[Math.floor(Math.random() * headerColors.length)]

const homepageWrapper = (state: IndexPageState) => css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: `linear-gradient(to bottom right,
    ${getHeaderColor(state.gradientStartIndex).gradientStart},
    ${getHeaderColor(state.gradientStartIndex).gradientEnd})`,
  zIndex: 1,

  ':before': {
    content: ' ',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `url(/images/background.jpg)`,
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    opacity: 0.7,

    '@supports(mix-blend-mode: luminosity)': {
      mixBlendMode: 'luminosity',
      opacity: 1
    }
  }
})

const homepageWrapperInner = css({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: widths.normal,

  [breakpoints.lg]: {
    maxWidth: widths.large
  }
})

const homepageContent = css({
  padding: '5rem 0',

  '& .homepage-title': {
    marginTop: 0,
    color: colors.black,

    '& span': merge(sectionHeading(colors.white, 0, '.25rem')),

    [breakpoints.lg]: {
      fontSize: '3rem',
      lineHeight: 1.15
    }
  },

  '& .homepage-flavour': {
    margin: 0,
    fontSize: '1.25rem',
    color: colors.black,

    '& span': merge(highlightedText(colors.white, 0, '.25rem')),

    [breakpoints.md]: {
      fontSize: '1.5rem'
    }
  },

  [breakpoints.lg]: {
    padding: '10rem 0'
  }
})

const homeflavour = css(merge(highlightedText(colors.orange3, 0, '.25rem')))

const homeAboutButton = css({
  margin: '2rem 0',

  '& a': {
    padding: '.25rem .5rem',
    color: colors.white,
    border: `3px solid ${colors.white}`,

    [breakpoints.lg]: {
      padding: '.5rem 1rem',
      fontSize: '1.25rem',
    },

    '&:hover, &:focus': {
      color: colors.black,
      textDecoration: 'none',
      backgroundColor: colors.white
    }
  }
})

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

interface IndexPageState {
  gradientStartIndex: number
  gradientEndIndex: number
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor (props: IndexPageProps) {
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

  public render() {
    const { children, data } = this.props
    return (
      <div className={`${homepageWrapper(this.state)}`}>
        <Masthead title={data.site.siteMetadata.title} isHomepage={true} />
        <main className={`${homepageWrapperInner}`}>
          <div className={`${homepageContent}`}>
            <h1 className="homepage-title"><span>Hey, call me Resi.</span></h1>
            <p className="homepage-flavour"><span>I'm a professional web developer based in Jakarta, Indonesia.</span></p>
            <div className={`${homeAboutButton}`}>
              <Link to="/about">More about me</Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
