import * as React from 'react'
import Link from 'gatsby-link'

import Intro from '../components/Intro/Intro'
import ProjectView from '../components/ProjectView/ProjectView'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import MessageBox from '../components/MessageBox/MessageBox'

import { ProjectNode } from '../components/ProjectView/types'
import { SocialLinkNode } from '../components/SocialLinks/types'

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
  <div className="container">
    <Intro />
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
