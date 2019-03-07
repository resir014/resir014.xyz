import * as React from 'react'
import Helmet from 'react-helmet'
import { Global } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'

import menuItems from '../utils/menuItems'

import 'modern-normalize'

import { SiteMetadata } from '../types/gatsby'

import { LayoutRoot } from '../components/ui'
import { Masthead, Footer } from '../components/layout'

import GlobalStyles from '../styles/reset'
import PrismTheme from '../styles/prismjs-theme'

interface WrapperData {
  site: {
    siteMetadata: SiteMetadata
  }
}

interface WrapperState {
  navigationVisible: boolean
}

interface TemplateWrapperProps {
  layoutSize?: 'md' | 'lg' | 'xl' | 'fluid'
}

class TemplateWrapper extends React.Component<TemplateWrapperProps, WrapperState> {
  public static defaultProps = {
    mastheadSize: 'md'
  }

  public constructor(props: TemplateWrapperProps) {
    super(props)
    this.state = {
      navigationVisible: false
    }
  }

  public onNavToggleClick = () => {
    this.setState(prevState => ({
      navigationVisible: !prevState.navigationVisible
    }))
  }

  public render(): JSX.Element {
    const { children, layoutSize } = this.props

    return (
      <StaticQuery
        query={graphql`
          query IndexQuery {
            site {
              siteMetadata {
                title
                description
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
        `}
      >
        {(data: WrapperData) => (
          <LayoutRoot>
            <Global styles={GlobalStyles} />
            <Global styles={PrismTheme} />
            <Helmet>
              <title>{data.site.siteMetadata.title}</title>
              <meta name="description" content={data.site.siteMetadata.description} />
              <meta property="og:site_name" content={data.site.siteMetadata.title} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={data.site.siteMetadata.title} />
              <meta property="og:description" content={data.site.siteMetadata.description} />
              <meta name="twitter:dnt" content="on" />
              {Object.keys(data.site.siteMetadata.author.url).map(key => (
                <link key={key} rel="me" href={data.site.siteMetadata.author.url[key]} />
              ))}
            </Helmet>
            <Masthead
              title={data.site.siteMetadata.title}
              items={menuItems}
              transparent
              size={layoutSize}
              onNavToggleClick={this.onNavToggleClick}
            />
            {children}
            <Footer size={layoutSize} />
          </LayoutRoot>
        )}
      </StaticQuery>
    )
  }
}

export default TemplateWrapper
