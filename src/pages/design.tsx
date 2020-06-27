import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { RouterProps } from '@reach/router'

import { SiteData } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import { TemplateWrapper } from '../layouts'

import { Page, PageHeader, PageTitle, PageContent } from '../components/page'
import { Container } from '../components/layout'

import ChungkingCoreSpecs from '../modules/design/ChungkingCoreSpecs'
import ProjectComponentsSpecs from '../modules/design/ProjectComponentsSpecs'

interface DesignSystemPageProps extends RouterProps {
  data: {
    site: SiteData
    projects: {
      edges: ProjectField[]
    }
  }
}

const DesignSystemPage: React.FC<DesignSystemPageProps> = ({ data, location }) => {
  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`Chungking Design System · ${data.site.siteMetadata.title}`}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { property: 'og:title', content: 'Chungking Design System' },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description
            }
          ]}
        />
        <Helmet>
          <title>Chungking Design System &middot; {data.site.siteMetadata.title}</title>
          <meta
            property="og:url"
            content={`${data.site.siteMetadata.siteUrl}${location ? location.pathname : ''}`}
          />
        </Helmet>
        <article>
          <PageHeader>
            <PageTitle>Chungking Design System</PageTitle>
          </PageHeader>
          <PageContent>
            <Container>
              <ChungkingCoreSpecs />
              <ProjectComponentsSpecs data={data} />
            </Container>
          </PageContent>
        </article>
      </Page>
    </TemplateWrapper>
  )
}

export default DesignSystemPage

export const pageQuery = graphql`
  query DesignSystemPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
        }
      }
    }
    projects: allMarkdownRemark(
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
