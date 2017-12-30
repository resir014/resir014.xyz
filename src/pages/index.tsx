import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'

import { Masthead } from '../components/Masthead'
import { ToggleMenu } from '../components/ToggleMenu'
import Container from '../components/Container'
import { Footer } from '../components/Footer'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import { menuItems } from '../utils/menus'
import { colors, headerColors, breakpoints, widths } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'
import flavorText from '../utils/flavorText'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

const homepageWrapper = (state: IndexPageState) => css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: `linear-gradient(to bottom right,
    ${getHeaderColor(state.gradientStartIndex)},
    ${getHeaderColor(state.gradientEndIndex)})`,
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
  height: 'calc(100% - 0.5px)', // workaround for IE not centering shit properly w/ flexbox
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
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
  width: '100%',

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
  }
})

const homeflavour = css(merge(highlightedText(colors.orange3, 0, '.25rem')))

const homeAboutButton = css({
  margin: '2rem 0',

  '& a': {
    padding: '.25rem .5rem',
    color: colors.white,
    border: `3px solid ${colors.white}`,

    '&:hover, &:focus': {
      color: colors.black,
      textDecoration: 'none',
      backgroundColor: colors.white
    }
  }
})

interface IndexPageProps {
  location: {
    pathname: string
  }
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

class IndexPage extends React.Component<IndexPageProps & LayoutState, IndexPageState> {
  constructor(props: IndexPageProps & LayoutState) {
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
    const { children, data, location, sidebarVisible } = this.props
    const { pathname } = location
    return (
      <div className={`${homepageWrapper(this.state)}`}>
        <Masthead
          title={data.site.siteMetadata.title}
          items={menuItems}
          pathname={pathname}
          transparent={true}
        />
        <ToggleMenu items={menuItems} pathname={pathname} visible={sidebarVisible} />
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

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, IndexPageProps>(mapStateToProps)(IndexPage)

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
