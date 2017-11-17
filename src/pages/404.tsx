import * as React from 'react'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { photonColors, fonts, breakpoints, widths } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'

const notFoundPageContentClass = css({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: photonColors.white,
  backgroundColor: photonColors.grey90
})

const notFoundPageContentInnerClass = css({
  textAlign: 'center',

  '& h1': {
    marginTop: 0,
    fontFamily: fonts.sansSerif,

    '& span': merge(sectionHeading(photonColors.white, 0, '.25rem'))
  }
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
  <div className={`${notFoundPageContentClass}`}>
    <Helmet title={`Page not found · ${data.site.siteMetadata.title}`} />
    <main className={`${notFoundPageContentInnerClass}`}>
      <h1 className="page-title"><span>404</span></h1>
      <p className="lead">You've hit the void. <Link to="/">Go back home.</Link></p>
    </main>
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
