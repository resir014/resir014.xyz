import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const AppWrapper = styled.div`
  position: relative;
  height: 100%;
`

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
      {children()}
    </AppWrapper>
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
