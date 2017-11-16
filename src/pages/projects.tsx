import * as React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import Helmet from 'react-helmet'

import { sharedStyles } from '../utils/theme'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
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
    allProjectsJson: {
      edges: ProjectNode[]
    }
  }
}

const ProjectsPage: React.SFC<IndexPageProps> = ({ data }) => {
  const { siteMetadata } = data.site

  return (
    <div>
      <Masthead title={data.site.siteMetadata.title} />
      <main>
        <Helmet
          title={`Projects · ${siteMetadata.title}`}
        />
        <article>
          <PageHeader>
            <h1 className={`${pageTitleClass}`}><span>Projects</span></h1>
          </PageHeader>
          <Container>
            <div className={`${projectsPageContentClass}`}>
              <ProjectItemList projects={data.allProjectsJson.edges} />
            </div>
          </Container>
        </article>
      </main>
      <Footer title={data.site.siteMetadata.title} />
    </div>
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
        url
      }
    }
  }
  allProjectsJson {
    edges {
      node {
        title,
        year,
        tags,
        details,
        url
      }
    }
  }
}
`
