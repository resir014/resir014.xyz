import * as React from 'react'
import Helmet from 'react-helmet'

import { menuItems } from '../utils/menus'
import { SiteAuthor } from '../utils/types'

import Container from '../components/ui/Container'
import PageHeader from '../components/page/PageHeader'
import MarkdownContent from '../components/page/MarkdownContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PageContent from '../components/page/PageContent'
import PageTitle from '../components/page/PageTitle'
import Page from '../components/page/Page'
import PostThumbnail from '../components/post/PostThumbnail'
import PostThumbnailImage from '../components/post/PostThumbnailImage'
import PostHeader from '../components/post/PostHeader'
import PostMeta from '../components/post/PostMeta'

interface PageTemplateProps {
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
    icon: {
      sizes: { [key: string]: any }
    }
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        slug: string
        layout?: string
        headerImage?: string
        lead?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
        header_image?: {
          childImageSharp: {
            sizes: { [key: string]: any }
          }
        }
      }
    }
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { author } = siteMetadata
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title },
          {
            property: 'og:description',
            content: post.fields.lead || post.excerpt
          }
        ]}
      />
      <article className="h-entry">
        <PostHeader>
          <PostMeta>
            <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
          </PostMeta>
        </PostHeader>
        {post.frontmatter.header_image && (
          <PostThumbnail>
            <PostThumbnailImage
              sizes={post.frontmatter.header_image.childImageSharp.sizes}
              alt={post.frontmatter.title}
            />
          </PostThumbnail>
        )}
        <PageContent>
          <Container>
            {post.fields.lead ? (
              <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
            ) : null}
            <MarkdownContent className="e-content" html={post.html} />
            <div className="hidden">
              <p>
                Posted by{' '}
                <a rel="author" className="p-author h-card" href={author.website}>
                  {author.name}
                </a>
              </p>
              <p>
                <a
                  className="u-url"
                  href={data.site.siteMetadata.siteUrl + data.markdownRemark.fields.slug}
                >
                  Permalink
                </a>
              </p>
            </div>
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default PageTemplate

export const query = graphql`
  query PageQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
        layout
        lead
      }
      frontmatter {
        title
        header_image {
          childImageSharp {
            sizes(maxWidth: 1140) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
