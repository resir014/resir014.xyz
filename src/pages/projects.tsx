import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { SiteData } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import filterProjectsByCategory from '../utils/filterProjectsByCategory'
import getFeaturedProject from '../utils/getFeaturedProject'
import { TemplateWrapper } from '../layouts'

import { Page, PageHeader, PageTitle, PageContent } from '../components/page'
import { FeaturedProject, ProjectItemList } from '../components/projects'
import { Container } from '../components/layout'
import { Stack } from '../components/chungking-core'

interface ProjectsPageProps {
  location: {
    pathname: string
  }
  data: {
    site: SiteData
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
  const featuredProject = getFeaturedProject(data.allMarkdownRemark.edges, 'Pinjollist')

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
          <PageHeader>
            <PageTitle>Projects</PageTitle>
          </PageHeader>
          <PageContent>
            <Container>
              <Stack spacing="xxl">
                {featuredProject ? (
                  <FeaturedProject
                    key={featuredProject.node.frontmatter.title}
                    node={featuredProject.node}
                  />
                ) : null}
                <ProjectItemList
                  title="Web stuff"
                  projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'web')}
                />
                <ProjectItemList
                  title="Other stuff"
                  projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'other')}
                />
              </Stack>
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
