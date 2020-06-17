import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { SiteAuthor } from '../types/default'
import { BlogPostField } from '../types/fields'

import withPathPrefix from '../utils/withPathPrefix'

import { Box, mediaQueries, Stack } from '../components/chungking-core'
import { Container } from '../components/layout'
import { PageHeader, PageTitle, PageContent } from '../components/page'
import { BlogPostItem, PaginationLink } from '../components/posts-index'
import { PageWrapper } from '../layouts'

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

  ${mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const PostsIndexPage: React.FC<BlogPageProps> = ({ data, pathContext }) => {
  const { siteMetadata } = data.site
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = withPathPrefix(index - 1 === 1 ? '' : (index - 1).toString(), pathPrefix)
  const nextUrl = withPathPrefix((index + 1).toString(), pathPrefix)
  const pageTitle = `Posts${index && index > 1 ? ` (page ${index} of ${pageCount})` : ''}`

  return (
    <PageWrapper pageTitle={`${pageTitle} · ${siteMetadata.title}`}>
      <Helmet>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta property="og:title" content="Posts" />
        <meta property="og:description" content={data.site.siteMetadata.description} />
      </Helmet>
      <PageHeader>
        <PageTitle>
          Posts
          {index && index > 1 && ` (page ${index} of ${pageCount})`}
        </PageTitle>
      </PageHeader>
      <PageContent className="h-feed">
        <Container size="md">
          <Stack spacing="lg">
            {group.map(({ node }) => (
              <BlogPostItem key={node.fields.slug} node={node} />
            ))}
          </Stack>
        </Container>
        <Box mt="xxl">
          <Container size="md">
            <Pagination>
              <PaginationLink test={first} url={previousUrl} text="Newer posts" />
              <PaginationLink test={last} url={nextUrl} text="Older posts" />
            </Pagination>
          </Container>
        </Box>
      </PageContent>
    </PageWrapper>
  )
}

export default PostsIndexPage

export const pageQuery = graphql`
  query BlogPostsIndexQuery {
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
