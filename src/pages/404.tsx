import * as React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import Helmet from 'react-helmet'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'

const notFoundPageContentClass = css({
  marginTop: '3rem'
})

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const NotFoundPage: React.SFC<NotFoundPageProps> = ({ data }) => (
  <div>
    <Masthead title={data.site.siteMetadata.title} />
    <main>
      <Helmet title={`Page not found · ${data.site.siteMetadata.title}`} />
      <article>
        <PageHeader>
          <h1 className="page-title"><span>404</span></h1>
        </PageHeader>
        <Container>
          <div className={`${notFoundPageContentClass}`}>
            <p className="lead">You've hit the void. <Link to="/">Go back home.</Link></p>
          </div>
        </Container>
      </article>
    </main>
    <Footer title={data.site.siteMetadata.title} />
  </div>
)

export default NotFoundPage

export const query = graphql`
query NotFoundPageQuery {
  site {
    siteMetadata {
      title
    }
  }
}
`
