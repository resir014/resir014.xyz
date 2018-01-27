import * as React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'

import { menuItems } from '../utils/menus'
import mediaQueries from '../utils/mediaQueries'
import { colors } from '../utils/theme'

import 'typeface-zilla-slab'
import 'typeface-open-sans'

// inject global styles
import 'normalize.css'
import '../styles/globals.scss'

import 'prism-themes/themes/prism-atom-dark.css'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Footer from '../components/Footer'

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
        author: {
          name: string
          url: string
        }
      }
    }
  }
}

interface WrapperState {
  navigationVisible: boolean
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${colors.grey90};
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: opacity .2s ease, visibility 0ms linear .2s;
  z-index: 200;

  ${(props: OverlayProps) => props.visible && css`
    @media only screen and ${mediaQueries.md} {
      visibility: visible;
      opacity: .55;
      background-color: $color-black;
      transition-delay: 0ms;
    }
  `}
`

class TemplateWrapper extends React.Component<WrapperProps, WrapperState> {
  constructor(props: WrapperProps) {
    super(props)
    this.state = {
      navigationVisible: false,
    }
  }

  public onNavToggleClick = () => {
    this.setState(prevState => ({
      navigationVisible: !prevState.navigationVisible,
    }))
  }

  public render() {
    const { children, data, location } = this.props
    const { navigationVisible } = this.state
    const { pathname } = location
    const isHomepage = pathname === withPrefix('/')
    const is404 = pathname === withPrefix('/404')

    return (
      <AppWrapper>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { property: 'og:site_name', content: data.site.siteMetadata.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: data.site.siteMetadata.title },
            { property: 'og:description', content: data.site.siteMetadata.description },
          ]}
        />
        <Masthead
          title={data.site.siteMetadata.title}
          items={menuItems}
          pathname={pathname}
          transparent={true}
          onNavToggleClick={this.onNavToggleClick}
        />
        <ToggleMenu
          items={menuItems}
          pathname={pathname}
          visible={navigationVisible}
          onCloseButtonClick={this.onNavToggleClick}
        />
        {children()}
        <Overlay visible={navigationVisible} onClick={this.onNavToggleClick} />
        {isHomepage || is404 ? null : <Footer title={data.site.siteMetadata.title} />}
      </AppWrapper>
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
          url
        }
      }
    }
  }
`
