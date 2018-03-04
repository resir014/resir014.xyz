import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'

import { menuItems } from '../utils/menus'
import { headerColors, colors } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/globalStyles'
import flavorText from '../utils/flavorText'
import mediaQueries, { widths } from '../utils/mediaQueries'
import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import HeaderImage from '../components/page/HeaderImage'
import HomepageContent from '../components/home/HomepageContent'
import HomepageSection from '../components/home/HomepageSection'

const backgroundImage = require('../assets/images/background.jpg')

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

const HomepageFlavour = styled.p`
  margin: 0;
  font-size: 1.25rem;
  color: ${colors.grey90};

  @media ${mediaQueries.md} {
    font-size: 1.5rem;
  }
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
    headerImage: {
      sizes: { [key: string]: any }
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
      <Page>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { property: 'og:title', content: 'Home' },
            { property: 'og:description', content: data.site.siteMetadata.description },
          ]}
        />
        <PageHeader fixedHeight>
          <HeaderImage sizes={data.headerImage.sizes} alt="" />
        </PageHeader>
        <HomepageContent>
          <Divider spacing="large" />
          <HomepageSection>
            <h1>Hey, call me Resi.</h1>
            <p>I'm a professional web developer based in Jakarta, Indonesia.</p>
            <Button kind="nav-link" color="primary" size="lg" to="/about">More about me</Button>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <h1>I do (mostly) JavaScript.</h1>
            <p>Here are my skillsets.</p>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <h1>Projects.</h1>
            <Button kind="nav-link" color="primary" size="lg" to="/projects">View all projects</Button>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <h1>Posts.</h1>
            <p>Ramblings about computer stuffs.</p>
          </HomepageSection>
        </HomepageContent>
      </Page>
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
    headerImage: imageSharp(id: { regex: "/background.jpg/" }) {
      sizes(maxWidth: 1920) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
