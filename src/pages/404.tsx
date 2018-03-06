import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { colors, fonts } from '../styles/variables'
import { media } from '../styles/mixins'

import Page from '../components/page/Page'

const PageWrapper = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.ink90};
`

const PageInner = styled.div`
  text-align: center;

  a {
    color: ${colors.blue40};
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    font-family: ${fonts.sansSerif};
    font-size: 2.074rem;

    ${media.md`
      font-size: 2.441rem;
    `} ${media.lg`
      font-size: 3.157rem;
    `}

    span {
      display: inline-block;
      margin: 0;
      padding: 0 0.5rem;
      background-color: ${colors.white};
      color: ${colors.ink90};
    }
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 300;
  }
`

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
  }
}

const NotFoundPage: React.SFC<NotFoundPageProps> = ({ data }) => (
  <PageWrapper>
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
    <PageInner>
      <h1 className="page-title">
        <span>404</span>
      </h1>
      <p className="lead">
        You've hit the void. <Link to="/">Go back home.</Link>
      </p>
    </PageInner>
  </PageWrapper>
)

export default NotFoundPage

export const query = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
  }
`
