import * as React from 'react'
import Link from 'gatsby-link'

import About from '../components/about'
import ProjectView, { ProjectNode } from '../components/projectView'
import SocialLinks, { SocialLinkNode } from '../components/socialLinks'

interface IndexPageProps {
  data: {
    allProjectsJson: {
      edges: ProjectNode[]
    },
    allSocialLinksJson: {
      edges: SocialLinkNode[]
    }
  }
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }) => (
  <div>
    <About />
    <ProjectView projects={data.allProjectsJson.edges} />
    <SocialLinks links={data.allSocialLinksJson.edges} />
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
  },
  allSocialLinksJson {
    edges {
      node {
        title,
        url,
        description
      }
    }
  }
}
`
