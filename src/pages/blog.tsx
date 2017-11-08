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

interface BlogPageProps {
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

const BlogPage: React.SFC<BlogPageProps> = ({ data }) => {
  const { siteMetadata } = data.site

  return (
    <main>
      <Masthead title={data.site.siteMetadata.title} />
      <article>
        <Helmet title={`Blog · ${siteMetadata.title}`} />
        <PageHeader>
          <h1 className="page-title"><span>Blog</span></h1>
        </PageHeader>
        <Container>
          <div className={`${blogPostsContentClass}`}>
            <div className={`${blogPostsListClass}`}>
              {data.allMarkdownRemark.edges.map(({ node }) => <BlogPostItem key={node.frontmatter.title} node={node} />)}
            </div>
          </div>
        </Container>
      </article>
      <Footer />
    </main>
  )
}

export default BlogPage

export const query = graphql`
query BlogPageQuery {
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
    filter: {id: {regex: "/blog/"}},
    sort: {fields: [fields___date], order: DESC}
  ) {
    edges {
      node {
        excerpt
        html
        fields {
          date(formatString: "MMMM DD, YYYY")
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
}
`
