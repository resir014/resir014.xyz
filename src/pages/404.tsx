import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata } from '../types/gatsby'

import TemplateWrapper from '../layouts'

import { Page, PageHeader, PageTitle, PageSubtitle } from '../chungking/components/page'

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
  }
}

const NotFoundPage: React.SFC<NotFoundPageProps> = ({ data }) => (
  <TemplateWrapper>
    <Page>
      <Helmet
        title={`404: Page not found. · ${data.site.siteMetadata.title}`}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { property: 'og:title', content: '404: Page not found.' },
          {
            property: 'og:description',
            content: data.site.siteMetadata.description
          }
        ]}
      />
      <article>
        <PageHeader>
          <PageTitle>404.</PageTitle>
          <PageSubtitle>
            You&apos;ve hit the void. <Link to="/">Go back home.</Link>
          </PageSubtitle>
        </PageHeader>
      </article>
    </Page>
  </TemplateWrapper>
)

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQuery {
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
  }
`
