import * as React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import { menuItems } from '../utils/menus'
import { SiteAuthor } from '../utils/types'
import { colors } from '../styles/variables'
import normalize from '../styles/normalize'

import 'typeface-zilla-slab'

// inject global styles
normalize()
import 'prism-themes/themes/prism-atom-dark.css'

import LayoutRoot from '../components/ui/LayoutRoot'
import Masthead from '../components/ui/Masthead'
import Footer from '../components/ui/Footer'

interface OverlayProps {
  visible: boolean
}

interface WrapperProps {
  location: {
    pathname: string
  }
  children: () => any
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
        description: string
        author: SiteAuthor
      }
    }
  }
}

interface WrapperState {
  navigationVisible: boolean
}

class TemplateWrapper extends React.Component<WrapperProps, WrapperState> {
  constructor(props: WrapperProps) {
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
    const { children, data, location } = this.props
    const { navigationVisible } = this.state
    const { author } = data.site.siteMetadata
    const { pathname } = location
    const isHomepage = pathname === withPrefix('/')
    const is404 = pathname === withPrefix('/404')

    return (
      <LayoutRoot>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta property="og:site_name" content={data.site.siteMetadata.title} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:description" content={data.site.siteMetadata.description} />
          <meta name="twitter:dnt" content="on" />
          {Object.keys(author.url).map(key => <link key={key} rel="me" href={author.url[key]} />)}
        </Helmet>
        <Masthead
          title={data.site.siteMetadata.title}
          items={menuItems}
          pathname={pathname}
          transparent
          onNavToggleClick={this.onNavToggleClick}
        />
        {children()}
        <Footer title={data.site.siteMetadata.title} />
      </LayoutRoot>
    )
  }
}

export default TemplateWrapper

export const query = graphql`
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
`
