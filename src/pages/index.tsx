import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import { menuItems } from '../utils/menus'
import { BlogPostField, ProjectField } from '../utils/types'
import getFeaturedProject from '../utils/getFeaturedProject'

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
        author: {
          name: string
          url: string
        }
      }
    }
    headerImage: {
      sizes: { [key: string]: any }
    }
    latestPosts: {
      edges: BlogPostField[]
    }
    projects: {
      edges: ProjectField[]
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

  public render() {
    const { children, data, location } = this.props
    const featuredProject = getFeaturedProject(data.projects.edges, 'aquellex.ws')
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
            <HomepageSectionTitle>Hey, call me Resi.</HomepageSectionTitle>
            <HomepageSectionDescription>
              I'm a professional web developer based in Jakarta, Indonesia.
            </HomepageSectionDescription>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/about">More about me</Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>I do (mostly) JavaScript.</HomepageSectionTitle>
            <HomepageSectionDescription>
              Here are some technologies I'm currently crazy about.
            </HomepageSectionDescription>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/about">View entire skillset</Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Projects.</HomepageSectionTitle>
            {
            featuredProject
              ? <HomepageFeaturedProject key={featuredProject.node.frontmatter.title} node={featuredProject.node} />
              : null
            }
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/projects">View all projects</Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Let's talk!</HomepageSectionTitle>
            <HomepageSectionDescription>
              Feel free to get in touch with me about anything.
            </HomepageSectionDescription>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/contact">Get in touch.</Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" />
          <HomepageSection>
            <HomepageSectionTitle>Posts.</HomepageSectionTitle>
            <HomepageSectionDescription>
              Ramblings about computer stuffs.
            </HomepageSectionDescription>
            <HomepageBlogContainer size="lg">
              {data.latestPosts.edges.map(({ node }) => <BlogPostItem key={node.fields.slug} node={node} />)}
            </HomepageBlogContainer>
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/posts">View all posts</Button>
            </HomepageSectionFooter>
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
    latestPosts: allMarkdownRemark(
      filter: {id: {regex: "/posts/"}},
      limit: 3,
      sort: {fields: [fields___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
            link
            category
            lead
          }
          frontmatter {
            title
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {id: {regex: "/projects/"}}
      sort: {fields: [fields___year], order: DESC}
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
            headerImage
            category
            lead
            project_url
            jumpToProject
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
