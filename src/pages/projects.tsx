import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import PageTitle from '../components/page/PageTitle'
import PageContent from '../components/page/PageContent'
import FeaturedProject from '../components/projects/FeaturedProject'
import ProjectItemList from '../components/projects/ProjectItemList'

import filterProjectsByCategory from '../utils/filterProjectsByCategory'
import getFeaturedProject from '../utils/getFeaturedProject'
import TemplateWrapper from '../layouts'

interface ProjectsPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    allMarkdownRemark: {
      edges: ProjectField[]
    }
    allProjectsJson: {
      edges: ProjectField[]
    }
  }
}

const ProjectsPage: React.SFC<ProjectsPageProps> = ({ data }) => {
  const { siteMetadata } = data.site
  const featuredProject = getFeaturedProject(data.allMarkdownRemark.edges, 'aquellex.ws')

  return (
    <TemplateWrapper>
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
          <PageHeader size="xl">
            <PageTitle>Projects</PageTitle>
          </PageHeader>
          <PageContent>
            {featuredProject ? (
              <FeaturedProject
                key={featuredProject.node.frontmatter.title}
                node={featuredProject.node}
              />
            ) : null}
            <Container size="xl">
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
    </TemplateWrapper>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
        }
      }
    }
    allMarkdownRemark(
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
