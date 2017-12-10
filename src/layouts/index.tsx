import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { css, merge } from 'glamor'

import { Masthead } from '../components/Masthead'
import { ToggleMenu } from '../components/ToggleMenu'
import Footer from '../components/Footer/Footer'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import { colors, sharedStyles, breakpoints } from '../utils/theme'
import { MenuItem } from '../utils/types'

import 'typeface-zilla-slab'
import 'typeface-open-sans'

import 'glamor/reset'
import '../styles/globals.scss'
import 'prism-themes/themes/prism-atom-dark.css'

const fullHeightWrapperClass = css(merge(sharedStyles.base), {
  position: 'relative',
  minHeight: '100%'
})

export const menuItems: MenuItem[] = [
  { name: 'About', path: '/about' },
  { name: 'Posts', path: '/posts' },
  { name: 'Projects', path: '/projects' },
  { name: 'Stuff', path: '/etc' }
]

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

class TemplateWrapper extends React.PureComponent<WrapperProps & LayoutState, {}> {
  public render() {
    const { children, data, sidebarVisible } = this.props
    const { pathname } = this.props.location
    const isHomepage = pathname === '/'
    const is404 = pathname === '/404'

    return (
      <div id="layout-root">
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
        {!is404
          ? <Masthead
            title={data.site.siteMetadata.title}
            items={menuItems}
            pathname={pathname}
            transparent={true}
          />
          : ''
        }
        <ToggleMenu items={menuItems} pathname={pathname} visible={sidebarVisible} />
        <div className={`${fullHeightWrapperClass}`}>
          {children()}
        </div>
        {!isHomepage && !is404 ? <Footer title={data.site.siteMetadata.title} /> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, WrapperProps>(mapStateToProps)(TemplateWrapper)

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
