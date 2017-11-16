import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { css } from 'glamor'

import { Masthead } from '../components/Masthead'
import Footer from '../components/Footer/Footer'

import { colors, breakpoints } from '../utils/theme'

import 'typeface-zilla-slab'
import 'typeface-open-sans'

import 'glamor/reset'
import '../styles/globals.scss'
import 'prism-themes/themes/prism-atom-dark.css'

const fullHeightWrapperClass = css({
  position: 'relative',
  height: '100%'
})

interface WrapperProps {
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

const TemplateWrapper: React.SFC<WrapperProps> = ({ children, data }) => (
  <div className={`${fullHeightWrapperClass}`}>
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
    <div className={`${fullHeightWrapperClass}`}>
      {children()}
    </div>
  </div>
)

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
