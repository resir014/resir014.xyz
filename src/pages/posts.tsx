import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'


import PageTitle from '../components/PageTitle'
import PageContent from '../components/PageContent'
import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Footer from '../components/Footer'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import BlogPostItem from '../components/BlogPostItem'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import { menuItems } from '../utils/menus'
import { BlogPostNode } from '../utils/types'
import { photonColors } from '../utils/theme'

const BlogPostList = styled.div`
  border-bottom: 2px solid ${photonColors.grey90};
`

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
      edges: BlogPostNode[]
    }
  }
}

const BlogPage: React.SFC<BlogPageProps & LayoutState> = ({ data, location, sidebarVisible }) => {
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <React.Fragment>
      <Helmet
        title={`Posts · ${siteMetadata.title}`}
        meta={[
          { property: 'og:title', content: `Posts · ${siteMetadata.title}` },
        ]}
      />
      <Masthead
        title={data.site.siteMetadata.title}
        items={menuItems}
        pathname={pathname}
        transparent={true}
      />
      <ToggleMenu items={menuItems} pathname={pathname} visible={sidebarVisible} />
      <main>
        <PageHeader>
          <PageTitle><span>Posts</span></PageTitle>
        </PageHeader>
        <Container>
          <PageContent>
            <BlogPostList>
              {data.allMarkdownRemark.edges.map(({ node }) => <BlogPostItem key={node.fields.slug} node={node} />)}
            </BlogPostList>
          </PageContent>
        </Container>
      </main>
      <Footer title={data.site.siteMetadata.title} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, BlogPageProps>(mapStateToProps)(BlogPage)

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
