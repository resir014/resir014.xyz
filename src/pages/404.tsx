import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { createLinkStyle } from '../utils/globalStyles'
import { photonColors, fonts, breakpoints, widths, sharedStyles } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'

import Masthead from '../components/Masthead'
import Container from '../components/Container'
import Footer from '../components/Footer'
import { PageHeader } from '../components/PageHeader'

const notFoundPageContentClass = css({
  display: 'flex',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: photonColors.white,
  backgroundColor: photonColors.grey90
})

const PageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};
`

const PageInner = styled.main`
  text-align: center;

  a {
    ${createLinkStyle(photonColors.blue40, photonColors.blue50)}
  }

  h1 {
    margin-top: 0;
    font-family: ${fonts.sansSerif};

    span {
      display: inline-block;
      margin: 0;
      padding: 0 .25rem;
      background-color: ${photonColors.white};
    }
  }
`

const notFoundPageContentInnerClass = css({
  textAlign: 'center',

  '& a': merge(sharedStyles.link, {
    color: photonColors.blue40,

    '&:hover, &:focus': {
      color: photonColors.blue50,
    }
  }),

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
  <PageWrapper>
    <Helmet title={`404: Page not found. · ${data.site.siteMetadata.title}`} />
    <main className={`${notFoundPageContentInnerClass}`}>
      <h1 className="page-title"><span>404</span></h1>
      <p className="lead">You've hit the void. <Link to="/">Go back home.</Link></p>
    </main>
  </PageWrapper>
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
