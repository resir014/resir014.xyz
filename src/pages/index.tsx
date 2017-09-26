import * as React from 'react'
import Link from 'gatsby-link'

import About from '../components/about'
import ProjectView from '../components/projectView'

interface ProjectNode {
  node: {
    title: string
    year: string
    languages: string[]
    details: string
    url: string
  }
}

interface IndexPageProps {
  data: {
    allProjectsJson: {
      edges: ProjectNode[]
    }
  }
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }) => (
  <div>
    <About />
    <ProjectView projects={data.allProjectsJson.edges} />
  </div>
)

export default IndexPage

export const query = graphql`
query indexPageQuery {
  allProjectsJson {
    edges {
      node {
        title,
        year,
        languages,
        details,
        url
      }
    }
  },
  allSkillsetJson {
    edges {
      node {
        type,
        name,
        level,
        scale
      }
    }
  }
}
`
