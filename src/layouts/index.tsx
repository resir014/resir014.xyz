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
import { menuItems } from '../utils/menus'
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

const TemplateWrapper: React.SFC<WrapperProps> = ({ children, data, location }) => {
  const { pathname } = location

  return (
    <div id="layout-root" className={`${fullHeightWrapperClass}`}>
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
      {children()}
    </div>
  )
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
