import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Global } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'

import menuItems from '../utils/menuItems'

import 'modern-normalize'
import 'typeface-inter'

import { SiteMetadata } from '../types/gatsby'

import { LayoutRoot } from '../components/ui'
import { Masthead, Footer } from '../components/layout'

import PrismTheme from '../styles/prismjs-theme'
import { Theme, GlobalStyles } from '../components/chungking-core'

interface WrapperData {
  site: {
    siteMetadata: SiteMetadata
  }
}

interface TemplateWrapperProps {
  layoutSize?: 'md' | 'lg' | 'xl' | 'fluid'
}

const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          url {
            twitter
            mastodon
            instagram
            tumblr
            github
          }
        }
      }
    }
  }
`

const OpenGraphTags: React.FC<WrapperData> = ({ site }) => {
  return (
    <>
      <meta name="description" content={site.siteMetadata.description} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={site.siteMetadata.title} />
      <meta property="og:description" content={site.siteMetadata.description} />
    </>
  )
}

const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ children, layoutSize }) => {
  return (
    <StaticQuery query={query}>
      {(data: WrapperData) => (
        <Theme>
          <LayoutRoot>
            <Global styles={GlobalStyles} />
            <Global styles={PrismTheme} />
            <Helmet>
              <title>{data.site.siteMetadata.title}</title>
              <OpenGraphTags site={data.site} />
              <meta name="twitter:dnt" content="on" />
              {Object.keys(data.site.siteMetadata.author.url).map(key => (
                <link key={key} rel="me" href={data.site.siteMetadata.author.url[key]} />
              ))}
            </Helmet>
            <Masthead title={data.site.siteMetadata.title} items={menuItems} />
            {children}
            <Footer size={layoutSize} />
          </LayoutRoot>
        </Theme>
      )}
    </StaticQuery>
  )
}

export default TemplateWrapper
