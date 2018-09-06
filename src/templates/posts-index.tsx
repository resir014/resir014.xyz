import * as React from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageMeta from '../components/page/PageMeta'
import PageTitle from '../components/page/PageTitle'
import PageContent from '../components/page/PageContent'
import BlogPostItem from '../components/postsList/BlogPostItem'

import { SiteAuthor } from '../utils/types'
import { BlogPostField } from '../utils/types'
import PaginationLink from '../components/postsList/PaginationLink'
import Divider from '../components/ui/Divider'
import { getEmSize } from '../styles/mixins'
import withPathPrefix from '../utils/withPathPrefix'
import { pxSizes } from '../styles/variables'
import TemplateWrapper from '../layouts'

interface BlogPageProps {
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

const Pagination = styled('div')`
  display: flex;
  flex-direction: column;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const PostsIndexPage: React.SFC<BlogPageProps> = ({ data, pathContext }) => {
  const { siteMetadata } = data.site
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = withPathPrefix(index - 1 === 1 ? '' : (index - 1).toString(), pathPrefix)
  const nextUrl = withPathPrefix((index + 1).toString(), pathPrefix)

  return (
    <TemplateWrapper>
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
            {group.map(({ node }) => (
              <BlogPostItem key={node.fields.slug} node={node} />
            ))}
          </Container>
          <Divider spacing="large" />
          <Container size="lg">
            <Pagination>
              <PaginationLink test={first} url={previousUrl} text="Newer posts" />
              <PaginationLink test={last} url={nextUrl} text="Older posts" />
            </Pagination>
          </Container>
        </PageContent>
      </Page>
    </TemplateWrapper>
  )
}

export default PostsIndexPage

export const pageQuery = graphql`
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
