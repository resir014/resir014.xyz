import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { menuItems } from '../utils/menus'

import 'typeface-zilla-slab'
import 'typeface-barlow'
import 'modern-normalize'
import '../styles/reset'
import 'prism-themes/themes/prism-darcula.css'

import LayoutRoot from '../components/ui/LayoutRoot'
import Masthead from '../components/ui/Masthead'
import Footer from '../components/ui/Footer'
import { SiteMetadata } from '../types/gatsby'

interface WrapperData {
  site: {
    siteMetadata: SiteMetadata
  }
}

interface WrapperState {
  navigationVisible: boolean
}

class TemplateWrapper extends React.Component<{}, WrapperState> {
  constructor(props: any) {
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

  public render() {
    const { children } = this.props

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
              onNavToggleClick={this.onNavToggleClick}
            />
            {children}
            <Footer title={data.site.siteMetadata.title} />
          </LayoutRoot>
        )}
      </StaticQuery>
    )
  }
}

export default TemplateWrapper
