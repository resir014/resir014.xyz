import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { menuItems } from '../utils/menus'
import { colors } from '../utils/theme'

import Container from '../components/ui/Container'
import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import PostHeader from '../components/post/PostHeader'
import PostMetaItem from '../components/post/PostMetaItem'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PostTitle from '../components/post/PostTitle'
import MarkdownContent from '../components/page/MarkdownContent'

interface BookmarkTemplateProps {
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

const LinkTitle = styled(PostTitle)`
  a {
    color: ${colors.blue60};

    &:hover, &:focus {
      color: ${colors.blue70};
    }
  }
`

const BookmarkTemplate: React.SFC<BookmarkTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title || 'Bookmark posted by @resir014'} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title || 'Bookmark posted by @resir014' },
          { property: 'og:description', content: post.fields.lead || post.excerpt },
          { property: 'og:type', content: 'article' },
          { property: 'og:article:author', content: siteMetadata.author.name },
          { property: 'og:article:published_time', content: post.fields.date_ogp },
        ]}
      />
      <article>
        <PostHeader>
          <PostMeta>
            <PostMetaItem>{post.fields.date}</PostMetaItem>
            {post.fields.category ? <PostMetaItem>{post.fields.category}</PostMetaItem> : null}
            <LinkTitle>
              <a href={post.fields.link} target="_blank" rel="noopener noreferrer">
                {post.frontmatter.title}
              </a>{' '}
              &raquo;
            </LinkTitle>
          </PostMeta>
        </PostHeader>
        <PageContent>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <MarkdownContent html={post.html} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default BookmarkTemplate

export const query = graphql`
  query BookmarkTemplateQuery($slug: String!) {
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
        headerImage
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
