import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Masthead from '../components/masthead'
import Footer from '../components/footer'

import 'typeface-zilla-slab'
import 'typeface-open-sans'

import '../styles/globals.scss'

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
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Masthead title={data.site.siteMetadata.title} />
    <main>
      {children()}
    </main>
    <Footer />
  </div>
)

export default TemplateWrapper

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title,
        tagline,
        description,
        author {
          name,
          url
        }
      }
    }
  }
`
