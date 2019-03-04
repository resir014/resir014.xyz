import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteAuthor } from '../types/default'
import { BlogPostField } from '../types/fields'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PageContent from '../components/page/PageContent'

import Divider from '../components/ui/Divider'
import { getEmSize } from '../styles/mixins'
import withPathPrefix from '../utils/withPathPrefix'
import { pxSizes } from '../styles/variables'
import TemplateWrapper from '../layouts'

import { PageHeader, PageTitle } from '../chungking/components/page'
import { BlogPostItem, PaginationLink } from '../chungking/components/posts-index'

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
        <PageHeader>
          <PageTitle>
            Posts
            {index && index > 1 && ` (page ${index} of ${pageCount})`}
          </PageTitle>
        </PageHeader>
        <PageContent className="h-feed">
          <Container size="md">
            {group.map(({ node }) => (
              <BlogPostItem key={node.fields.slug} node={node} />
            ))}
          </Container>
          <Divider spacing="large" />
          <Container size="md">
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
