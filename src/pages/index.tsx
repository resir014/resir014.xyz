import * as React from 'react'
import Link from 'gatsby-link'

import Intro from '../components/Intro/Intro'
import ProjectItemList from '../components/ProjectItemList/ProjectItemList'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import MessageBox from '../components/MessageBox/MessageBox'
import Widget from '../components/Widget/Widget'
import WidgetLinkButton from '../components/WidgetLinkButton/WidgetLinkButton'

import { ProjectNode } from '../components/ProjectItemList/types'
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
    <Widget title="Hey, call me Resi.">
      <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
      <WidgetLinkButton tag={Link} to="/about">
        More about me
      </WidgetLinkButton>
    </Widget>
    <Widget title="Projects">
      <ProjectItemList projects={data.allProjectsJson.edges} />
      <WidgetLinkButton
        href="https://resir014.github.io/projects"
        target="_blank"
      >
        More projects<br />(on resir014.github.io)
      </WidgetLinkButton>
    </Widget>
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
