import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { colors } from '../styles/variables'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import PageMeta from '../components/page/PageMeta'
import PageTitle from '../components/page/PageTitle'
import PageContent from '../components/page/PageContent'
import FeaturedProject from '../components/projects/FeaturedProject'
import ProjectItemList from '../components/projects/ProjectItemList'

import { menuItems } from '../utils/menus'
import { ProjectField } from '../utils/types'
import filterProjectsByCategory from '../utils/filterProjectsByCategory'
import getFeaturedProject from '../utils/getFeaturedProject'

interface ProjectsPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: { [key: string]: string }
        }
      }
    }
    allMarkdownRemark: {
      edges: ProjectField[]
    }
    allProjectsJson: {
      edges: ProjectField[]
    }
  }
}

const ProjectsPage: React.SFC<ProjectsPageProps> = ({ data, location }) => {
  const { siteMetadata } = data.site
  const { pathname } = location
  const featuredProject = getFeaturedProject(data.allMarkdownRemark.edges, 'aquellex.ws')

  return (
    <Page>
      <Helmet
        title={`Projects · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { property: 'og:title', content: 'Projects' },
          {
            property: 'og:description',
            content: data.site.siteMetadata.description
          }
        ]}
      />
      <article>
        <PageMeta>
          <PageTitle>Projects</PageTitle>
        </PageMeta>
        <PageContent>
          {featuredProject ? (
            <FeaturedProject
              key={featuredProject.node.frontmatter.title}
              node={featuredProject.node}
            />
          ) : null}
          <Container size="lg">
            <ProjectItemList
              title="Web development stuff"
              projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'web')}
            />
            <ProjectItemList
              title="Open source stuff"
              projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'oss')}
            />
            <ProjectItemList
              title="Other stuff"
              projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'other')}
            />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default ProjectsPage

export const query = graphql`
  query ProjectsPageQuery {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    allMarkdownRemark(
      filter: { id: { regex: "/projects/" } }
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
                sizes(maxWidth: 1140) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
