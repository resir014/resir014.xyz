import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageHeader from '../components/page/PageHeader'
import PageMeta from '../components/page/PageMeta'
import PageTitle from '../components/page/PageTitle'
import PageContent from '../components/page/PageContent'
import BlogPostItem from '../components/postsList/BlogPostItem'

import { menuItems } from '../utils/menus'
import { BlogPostField } from '../utils/types'
import { colors } from '../utils/theme'

interface BlogPageProps {
  location: {
    pathname: string
  }
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
      edges: BlogPostField[]
    }
  }
}

const BlogPage: React.SFC<BlogPageProps> = ({ data, location }) => {
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`Posts · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { property: 'og:title', content: 'Posts' },
          { property: 'og:description', content: data.site.siteMetadata.description },
        ]}
      />
      <section>
        <PageMeta>
          <PageTitle>Posts</PageTitle>
        </PageMeta>
        <Container size="lg">
          <PageContent>
            {data.allMarkdownRemark.edges.map(({ node }) => <BlogPostItem key={node.fields.slug} node={node} />)}
          </PageContent>
        </Container>
      </section>
    </Page>
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
    filter: {id: {regex: "/posts/"}},
    sort: {fields: [fields___date], order: DESC}
  ) {
    edges {
      node {
        excerpt
        html
        fields {
          date(formatString: "MMMM DD, YYYY")
          slug
          link
          category
          lead
        }
        frontmatter {
          title
        }
      }
    }
  }
}
`
