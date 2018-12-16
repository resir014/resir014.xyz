import * as React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { SiteMetadata } from '../types/gatsby'

import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import PostMeta from '../components/post/PostMeta'
import PageTitle from '../components/page/PageTitle'
import TemplateWrapper from '../layouts'
import PageSubtitle from '../components/page/PageSubtitle'

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
          <PostMeta>
            <PageTitle>404.</PageTitle>
            <PageSubtitle>
              You've hit the void. <Link to="/">Go back home.</Link>
            </PageSubtitle>
          </PostMeta>
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
