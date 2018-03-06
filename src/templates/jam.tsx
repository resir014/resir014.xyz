import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { menuItems } from '../utils/menus'
import { colors } from '../styles/variables'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import PostHeader from '../components/post/PostHeader'
import PostMetaItem from '../components/post/PostMetaItem'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import MarkdownContent from '../components/page/MarkdownContent'
import PostTitle from '../components/post/PostTitle'

interface JamTemplateProps {
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
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        slug: string
        layout?: string
        category?: string
        link?: string
        lead?: string
        date: string
        date_ogp?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
      }
    }
  }
}

const JamTemplate: React.SFC<JamTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title ||
          post.fields.lead ||
          post.excerpt} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          {
            property: 'og:title',
            content: post.frontmatter.title || 'Note posted by @resir014'
          },
          {
            property: 'og:description',
            content: post.fields.lead || post.excerpt
          },
          { property: 'og:type', content: 'article' },
          { property: 'og:article:author', content: siteMetadata.author.name },
          {
            property: 'og:article:published_time',
            content: post.fields.date_ogp
          }
        ]}
      />
      <article>
        <PostHeader>
          <PostMeta>
            <PostMetaItem>{post.fields.date}</PostMetaItem>
            {post.fields.category ? (
              <PostMetaItem>{post.fields.category}</PostMetaItem>
            ) : null}
            {post.frontmatter.title && (
              <PostTitle>{post.frontmatter.title}</PostTitle>
            )}
          </PostMeta>
        </PostHeader>
        <PageContent>
          <Container>
            <MarkdownContent html={post.html} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default JamTemplate

export const query = graphql`
  query JamTemplateQuery($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
        layout
        category
        link
        lead
        date(formatString: "DD MMMM YYYY")
        date_ogp: date
      }
      frontmatter {
        title
      }
    }
  }
`
