import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'

import { menuItems } from '../utils/menus'
import { colors, headerColors, colors } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/globalStyles'
import flavorText from '../utils/flavorText'
import mediaQueries, { widths } from '../utils/mediaQueries'
import Button from '../components/Button'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

interface HomepageWrapperProps {
  state: {
    gradientStartIndex: number
    gradientEndIndex: number
  }
  headerImage: string
  className?: string
}

const HomepageWrapperRoot: React.SFC<HomepageWrapperProps> = ({ state, className, headerImage, children }) => (
  <div className={className}>
    {children}
  </div>
)

const HomepageWrapper = styled(HomepageWrapperRoot)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom right,
    ${props => getHeaderColor(props.state.gradientStartIndex)},
    ${props => getHeaderColor(props.state.gradientEndIndex)});

  ${props => props.headerImage && hasHeaderImage}
`

const hasHeaderImage = css`
  z-index: 1;

  &:before {
    content: " ";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-image: url(${(props: HomepageWrapperProps) => props.headerImage});
    background-size: cover;
    background-position-y: center;
    opacity: 0.7;

    @supports(mix-blend-mode: luminosity) {
      mix-blend-mode: luminosity;
      opacity: 1;
    }
  }
`

const HomepageWrapperInner = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100% - 0.5px); // workaround for IE not centering shit properly w/ flexbox
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: ${widths.normal};

  @media ${mediaQueries.lg} {
    max-width: ${widths.large};
  }
`

const HomepageContent = styled.div`
  width: 100%;
`

const HomepageTitle = styled.h1`
  margin-top: 0;
  margin-bottom: .5rem;
  color: ${colors.grey90};

  span {
    ${sectionHeading(colors.white, 0, '.25rem')}
  }

  @media ${mediaQueries.lg} {
    font-size: 3rem;
    line-height: 1.15;
  }
`

const HomepageFlavour = styled.p`
  margin: 0;
  font-size: 1.25rem;
  color: ${colors.grey90};

  @media ${mediaQueries.md} {
    font-size: 1.5rem;
  }
`

const HomepageFlavourIntro = styled.span`
  ${sectionHeading(colors.white, 0, '.25rem')}
  line-height: 1.45;
`

const PageFooter = styled.div`
  margin-top: 2rem;
`

interface IndexPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
  }
}

interface IndexPageState {
  gradientStartIndex: number
  gradientEndIndex: number
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
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
    const { children, data, location } = this.props
    const { pathname } = location
    return (
      <HomepageWrapper state={this.state} headerImage="/images/background.jpg">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { property: 'og:title', content: 'Home' },
            { property: 'og:description', content: data.site.siteMetadata.description },
          ]}
        />
        <HomepageWrapperInner>
          <HomepageContent>
            <HomepageTitle><span>Hey, call me Resi.</span></HomepageTitle>
            <HomepageFlavour>
              <HomepageFlavourIntro>
                I'm a professional web developer based in Jakarta, Indonesia.
              </HomepageFlavourIntro>
            </HomepageFlavour>
            <PageFooter>
              <Button kind="nav-link" to="/about" color="white">More about me</Button>
            </PageFooter>
          </HomepageContent>
        </HomepageWrapperInner>
      </HomepageWrapper>
    )
  }
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
  }
`
