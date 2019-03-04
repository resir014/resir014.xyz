import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageContent from '../components/page/PageContent'

import filterProjectsByCategory from '../utils/filterProjectsByCategory'
import getFeaturedProject from '../utils/getFeaturedProject'
import TemplateWrapper from '../layouts'
import { PageHeader, PageTitle } from '../chungking/components/page'
import { FeaturedProject } from '../chungking/components/projects'
import ProjectItemList from '../chungking/components/projects/ProjectItemList'

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
    <TemplateWrapper mastheadSize="lg">
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
          <PageHeader size="lg">
            <PageTitle>Projects</PageTitle>
          </PageHeader>
          <PageContent>
            {featuredProject ? (
              <Container size="lg">
                <FeaturedProject
                  key={featuredProject.node.frontmatter.title}
                  node={featuredProject.node}
                />
              </Container>
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
