import * as React from 'react'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { sharedStyles, photonColors } from '../utils/theme'
import { sectionHeading } from '../utils/mixins'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { FeaturedProject } from '../components/FeaturedProject'
import { ProjectItemList } from '../components/ProjectItemList'

import { ProjectNode } from '../utils/types'

const projectsPageContentClass = css({
  marginTop: '3rem'
})

const pageTitleClass = css(sharedStyles.pageTitle)

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    allMarkdownRemark: {
      edges: ProjectNode[]
    }
    allProjectsJson: {
      edges: ProjectNode[]
    }
  }
}

const ProjectsPage: React.SFC<IndexPageProps> = ({ data }) => {
  const { siteMetadata } = data.site
  const featuredProject = getFeaturedProject(data.allMarkdownRemark.edges, 'aquellex.ws')

  return (
    <main>
      <Helmet
        title={`Projects · ${siteMetadata.title}`}
      />
      <article>
        <PageHeader>
          <h1 className={`${pageTitleClass}`}><span>Projects</span></h1>
        </PageHeader>
        <div className={`${projectsPageContentClass}`}>
          {
            featuredProject
              ? <FeaturedProject key={featuredProject.node.frontmatter.title} node={featuredProject.node} />
              : null
          }
          <Container>
            <ProjectItemList title="Web development stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'web')} />
            <ProjectItemList title="Open source stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'oss')} />
            <ProjectItemList title="Other stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'other')} />
          </Container>
        </div>
      </article>
    </main>
  )
}

const getFeaturedProject = (edges: ProjectNode[], name: string) => {
  return edges.filter(edge => edge.node.frontmatter.title === name)[0]
}

const filterProjectsByCategory = (edges: ProjectNode[], category: string) => (
  edges.filter(edge => edge.node.fields.category === category)
)

export default ProjectsPage

export const query = graphql`
query ProjectsPageQuery {
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
  allMarkdownRemark(
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
