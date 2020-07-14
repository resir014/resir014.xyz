import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Global } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'
import { monetize } from 'monetizer'

import menuItems from '../utils/menuItems'

import 'modern-normalize'
import 'typeface-inter'
import '../fonts/jetbrains-mono.css'

import { SiteMetadata } from '../types/gatsby'

import { LayoutRoot } from '../components/ui'
import { Masthead, Footer } from '../components/layout'

import PrismTheme from '../styles/PrismTheme'
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
  query TemplateWrapperQuery {
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

const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ children, layoutSize }) => {
  React.useEffect(() => monetize('$ilp.uphold.com/EhyxaNfxFZ4b'), [])

  return (
    <StaticQuery query={query}>
      {(data: WrapperData) => (
        <Theme>
          <LayoutRoot>
            <Global styles={GlobalStyles} />
            <Global styles={PrismTheme} />
            <Helmet>
              <title>{data.site.siteMetadata.title}</title>
              <meta name="description" content={data.site.siteMetadata.description} />,
              <meta property="og:site_name" content={data.site.siteMetadata.title} />,
              <meta property="og:type" content="website" />,
              <meta property="og:title" content={data.site.siteMetadata.title} />,
              <meta property="og:description" content={data.site.siteMetadata.description} />
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
