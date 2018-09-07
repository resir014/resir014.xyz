import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { colors } from '../styles/variables'
import flavors from '../utils/flavorText'

import { SiteMetadata, HeaderImage, HCardIcon } from '../types/gatsby'
import { ProjectField } from '../types/fields'
import { ProjectNode } from '../types/nodes'

import Button from '../components/ui/Button'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import HomepageContent from '../components/home/HomepageContent'
import HomepageSection from '../components/home/HomepageSection'
import HomepageSectionTitle from '../components/home/HomepageSectionTitle'
import HomepageSectionDescription from '../components/home/HomepageSectionDescription'
import HomepageSectionFooter from '../components/home/HomepageSectionFooter'
import HomepageLanguageList from '../components/home/HomepageLanguageList'
import HomepageLanguageListItem from '../components/home/HomepageLanguageListItem'
import HomepageThumbnail from '../components/home/HomepageThumbnail'
import HomepageThumbnailImage from '../components/home/HomepageThumbnailImage'
import HomepageThumbnailText from '../components/home/HomepageThumbnailText'
import HomepageThumbnailFlavour from '../components/home/HomepageThumbnailFlavour'
import ProjectItemList from '../components/projects/ProjectItemList'
import HCard from '../components/indieweb/HCard'
import TemplateWrapper from '../layouts'
import FeaturedProject from '../components/projects/FeaturedProject'
import filterProjectsByCategory from '../utils/filterProjectsByCategory'

interface IndexPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    headerImage: HeaderImage
    icon: HCardIcon
    featuredProject: ProjectNode
    allProjects: {
      edges: ProjectField[]
    }
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
    const { data } = this.props
    return (
      <TemplateWrapper>
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
            <HomepageThumbnailImage fluid={data.headerImage.childImageSharp.fluid} alt="" />
            <HomepageThumbnailText>
              <HomepageThumbnailFlavour
                title="@resir014"
                flavour={data.site.siteMetadata.flavourText}
              />
            </HomepageThumbnailText>
          </HomepageThumbnail>
          <HomepageContent>
            <Divider spacing="large" />
            <HomepageSection>
              <HomepageSectionTitle>Hey, call me Resi!</HomepageSectionTitle>
              <HomepageSectionDescription>
                I'm a professional web developer based in Jakarta, Indonesia.
              </HomepageSectionDescription>
              <HomepageSectionFooter>
                <Button kind="nav-link" color="primary" size="lg" to="/about">
                  More about me
                </Button>{' '}
                <Button kind="nav-link" color="primary" size="lg" to="/posts">
                  Read my posts
                </Button>
              </HomepageSectionFooter>
            </HomepageSection>
            <Divider spacing="large" />
            <HomepageSection size="xl">
              <FeaturedProject node={data.featuredProject} />
              <ProjectItemList
                title="Web development stuff"
                projects={filterProjectsByCategory(data.allProjects.edges, 'web')}
                homepage
              />
              <ProjectItemList
                title="Open source stuff"
                projects={filterProjectsByCategory(data.allProjects.edges, 'oss')}
                homepage
              />
              <ProjectItemList
                title="Other stuff"
                projects={filterProjectsByCategory(data.allProjects.edges, 'other')}
                homepage
              />
              <HomepageSectionFooter>
                <Button kind="nav-link" color="primary" size="lg" to="/projects">
                  View more of my stuff
                </Button>
              </HomepageSectionFooter>
            </HomepageSection>
          </HomepageContent>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Current skillset</HomepageSectionTitle>
            <HomepageSectionDescription>
              Got an interesting project in mind? Want me to help do it?{' '}
              <Link to="/contact">Let's talk!</Link>
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
          </HomepageSection>
          <Divider spacing="large" />
          <HCard icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
        </Page>
      </TemplateWrapper>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        flavourText
        author {
          name
          description
          website
          email
          url {
            twitter
            mastodon
            instagram
            tumblr
            github
          }
        }
      }
    }
    headerImage: file(absolutePath: { regex: "/assets/images/background.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
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
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allProjects: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/" } } }
      sort: { fields: [fields___year], order: DESC }
    ) {
      edges {
        node {
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
                fluid(maxWidth: 1140) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
