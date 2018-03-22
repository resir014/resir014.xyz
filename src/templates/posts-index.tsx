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
import { SiteAuthor } from '../utils/types'
import { BlogPostField } from '../utils/types'
import { colors } from '../styles/variables'
import PaginationLink from '../components/postsList/PaginationLink'
import Divider from '../components/ui/Divider'
import { media } from '../styles/mixins'

interface BlogPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
        author: SiteAuthor
      }
    }
    allMarkdownRemark: {
      edges: BlogPostField[]
    }
  }
  pathContext: {
    group: BlogPostField[]
    index: number
    first: boolean
    last: boolean
    pageCount: number
    pathPrefix?: string
  }
}

const Pagination = styled.div`
  display: flex;
  flex-direction: column;

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
  `};
`

const PostsIndexPage: React.SFC<BlogPageProps> = ({ data, pathContext, location }) => {
  const { siteMetadata } = data.site
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`Posts${index && index > 1 ? ` (page ${index} of ${pageCount})` : ''} · ${
          siteMetadata.title
        }`}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { property: 'og:title', content: 'Posts' },
          {
            property: 'og:description',
            content: data.site.siteMetadata.description
          }
        ]}
      />
      <PageMeta>
        <PageTitle>
          Posts
          {index && index > 1 && ` (page ${index} of ${pageCount})`}
        </PageTitle>
      </PageMeta>
      <PageContent className="h-feed">
        <Container size="lg">
          {group.map(({ node }) => <BlogPostItem key={node.fields.slug} node={node} />)}
        </Container>
        <Divider spacing="large" />
        <Container size="lg">
          <Pagination>
            <PaginationLink
              test={first}
              url={`/${pathPrefix!}/${previousUrl}`}
              text="Newer posts"
            />
            <PaginationLink test={last} url={`/${pathPrefix!}/${nextUrl}`} text="Older posts" />
          </Pagination>
        </Container>
      </PageContent>
    </Page>
  )
}

export default PostsIndexPage

export const query = graphql`
  query BlogPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
        }
      }
    }
  }
`
