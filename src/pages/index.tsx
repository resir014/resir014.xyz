import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import { colors } from '../styles/variables'
import { menuItems } from '../utils/menus'
import { BlogPostField, ProjectField, ProjectNode, SiteAuthor } from '../utils/types'
import flavors from '../utils/flavorText'
import getFeaturedProject from '../utils/getFeaturedProject'
import shuffleArray from '../utils/shuffleArray'

import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import HeaderImage from '../components/page/HeaderImage'
import HomepageContent from '../components/home/HomepageContent'
import HomepageSection from '../components/home/HomepageSection'
import BlogPostItem from '../components/postsList/BlogPostItem'
import HomepageBlogContainer from '../components/home/HomepageBlogContainer'
import HomepageSectionTitle from '../components/home/HomepageSectionTitle'
import HomepageSectionDescription from '../components/home/HomepageSectionDescription'
import HomepageSectionFooter from '../components/home/HomepageSectionFooter'
import HomepageFeaturedProject from '../components/home/HomepageFeaturedProject'
import HomepageLanguageList from '../components/home/HomepageLanguageList'
import HomepageLanguageListItem from '../components/home/HomepageLanguageListItem'
import HomepageThumbnail from '../components/home/HomepageThumbnail'
import HomepageThumbnailImage from '../components/home/HomepageThumbnailImage'
import HomepageThumbnailText from '../components/home/HomepageThumbnailText'
import HomepageThumbnailFlavour from '../components/home/HomepageThumbnailFlavour'
import HCard from '../components/indieweb/HCard'

const backgroundImage = require('../assets/images/background.jpg')

interface HomepageWrapperProps {
  state: {
    gradientStartIndex: number
    gradientEndIndex: number
  }
  headerImage: string
  className?: string
}

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
        siteUrl: string
        author: SiteAuthor
      }
    }
    headerImage: {
      sizes: { [key: string]: any }
    }
    icon: {
      sizes: { [key: string]: any }
    }
    featuredProject: ProjectNode
  }
}

interface IndexPageState {
  randomisedIndex: number
  isRandomised: boolean
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props)
    this.state = {
      randomisedIndex: 0,
      isRandomised: false
    }
  }

  public componentDidMount() {
    this.setState(prevState => ({
      randomisedIndex: Math.floor(Math.random() * flavors.length),
      isRandomised: !prevState.isRandomised
    }))
  }

  public render() {
    const { children, data, location } = this.props
    const { randomisedIndex, isRandomised } = this.state
    const { pathname } = location
    const randomSplash = shuffleArray(flavors)[0]
    return (
      <Page>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            { property: 'og:title', content: 'Home' },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description
            }
          ]}
        />
        <HomepageThumbnail>
          <HomepageThumbnailImage sizes={data.headerImage.sizes} alt="" />
          <HomepageThumbnailText>
            <HomepageThumbnailFlavour
              title="@resir014"
              randomised={isRandomised}
              flavour={randomSplash}
            />
          </HomepageThumbnailText>
        </HomepageThumbnail>
        <HomepageContent>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Hey, call me Resi.</HomepageSectionTitle>
            <HomepageSectionDescription>
              I'm a professional web developer based in Jakarta, Indonesia.
            </HomepageSectionDescription>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/about">
                More about me
              </Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>
              Professional programmer by day, hobbyist programmer by night.
            </HomepageSectionTitle>
            <HomepageSectionDescription>
              Here are some technologies I'm currently crazy about.
            </HomepageSectionDescription>
            <HomepageLanguageList>
              <HomepageLanguageListItem background="#ffff00" name="JavaScript (ES6)" />
              <HomepageLanguageListItem
                color={colors.white}
                background="#337ab7"
                name="TypeScript"
              />
              <HomepageLanguageListItem color="#61dafb" background="#282c34" name="React" />
              <HomepageLanguageListItem color={colors.white} background="#4e2a8e" name="Elixir" />
            </HomepageLanguageList>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/about">
                View entire skillset
              </Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Projects.</HomepageSectionTitle>
            <HomepageFeaturedProject node={data.featuredProject} />
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/projects">
                View all projects
              </Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Let's talk!</HomepageSectionTitle>
            <HomepageSectionDescription>
              Feel free to get in touch with me about anything.
            </HomepageSectionDescription>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/contact">
                Get in touch.
              </Button>
            </HomepageSectionFooter>
          </HomepageSection>
        </HomepageContent>
        <HCard icon={data.icon} author={data.site.siteMetadata.author} />
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
        siteUrl
        author {
          name
          description
          website
          email
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    headerImage: imageSharp(id: { regex: "/assets/images/background.jpg/" }) {
      sizes(maxWidth: 1920) {
        ...GatsbyImageSharpSizes
      }
    }
    icon: imageSharp(id: { regex: "/assets/images/resir014-icon.jpg/" }) {
      sizes(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpSizes
      }
    }
    featuredProject: markdownRemark(fields: { slug: { eq: "/projects/web/aquellexws/" } }) {
      excerpt
      html
      fields {
        year
        description
        tags
        slug
        category
        lead
        project_url
        jumpToProject
      }
      frontmatter {
        title
        header_image {
          childImageSharp {
            sizes(maxWidth: 1140) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
