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

interface VideoTemplateProps {
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
        headerImage?: string
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

const VideoTemplate: React.SFC<VideoTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title || 'Video posted by @resir014'} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          {
            property: 'og:title',
            content: post.frontmatter.title || 'Video posted by @resir014'
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
            <PostMetaItem>
              <time
                className="dt-published"
                dateTime={new Date(post.fields.date_ogp).toISOString()}
              >
                {post.fields.date}
              </time>
            </PostMetaItem>
            {post.fields.category ? (
              <PostMetaItem className="p-category">{post.fields.category}</PostMetaItem>
            ) : null}
            {post.frontmatter.title && (
              <PostTitle className="p-name">{post.frontmatter.title}</PostTitle>
            )}
          </PostMeta>
        </PostHeader>
        <PageContent>
          <Container>
            <MarkdownContent className="e-content" html={post.html} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default VideoTemplate

export const query = graphql`
  query VideoTemplateQuery($slug: String!) {
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
