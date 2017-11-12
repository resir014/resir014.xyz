import * as React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import Helmet from 'react-helmet'

import { Masthead } from '../components/Masthead'
import { Footer } from '../components/Footer'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { BlogPostItem } from '../components/BlogPostItem'

import { BlogPostNode } from '../utils/types'
import { breakpoints, widths, colors } from '../utils/theme'

const blogPostsContentClass = css({
  marginTop: '3rem'
})

const blogPostsListClass = css({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  borderBottom: `2px solid ${colors.black}`,

  '> div': {
    borderTop: `2px solid ${colors.black}`
  }
})

interface BitsPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    allMarkdownRemark: {
      edges: BlogPostNode[]
    }
  }
}

const BitsPage: React.SFC<BitsPageProps> = ({ data }) => {
  const { siteMetadata } = data.site

  return (
    <main>
      <Masthead title={data.site.siteMetadata.title} />
      <article>
        <Helmet title={`Bits · ${siteMetadata.title}`} />
        <PageHeader>
          <h1 className="page-title"><span>Bits</span></h1>
        </PageHeader>
        <Container>
          <div className={`${blogPostsContentClass}`}>
            <div className={`${blogPostsListClass}`}>
              {data.allMarkdownRemark.edges.map(({ node }) => <BlogPostItem key={node.fields.slug} node={node} />)}
            </div>
          </div>
        </Container>
      </article>
      <Footer title={data.site.siteMetadata.title} />
    </main>
  )
}

export default BitsPage

export const query = graphql`
query BitsPageQuery {
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
  allMarkdownRemark(
    filter: {id: {regex: "/bits/"}},
    sort: {fields: [fields___date], order: DESC}
  ) {
    edges {
      node {
        excerpt
        html
        fields {
          date(formatString: "MMMM DD, YYYY")
          slug
          category
          lead
        }
      }
    }
  }
}
`
