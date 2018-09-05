import * as React from 'react'
import * as classnames from 'classnames'
import Helmet from 'react-helmet'

import { SiteAuthor } from '../utils/types'

import Container from '../components/ui/Container'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import PostHeader from '../components/post/PostHeader'
import PostMetaItem from '../components/post/PostMetaItem'
import PageContent from '../components/page/PageContent'
import MarkdownContent from '../components/page/MarkdownContent'
import PostTitle from '../components/post/PostTitle'
import HCardPostFooter from '../components/indieweb/HCardPostFooter'

interface PhotoTemplateProps {
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
        header_image: {
          childImageSharp: {
            sizes: {
              src: string
              srcSet: string
            }
          }
        }
      }
    }
  }
}

const PhotoTemplate: React.SFC<PhotoTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title || 'Photo posted by @resir014'} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          {
            property: 'og:title',
            content: post.frontmatter.title || 'Photo posted by @resir014'
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
      <article className="h-entry">
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
            <img
              className="u-photo"
              src={post.frontmatter.header_image.childImageSharp.sizes.src}
              alt={post.frontmatter.title || 'Photo posted by @resir014'}
              srcSet={post.frontmatter.header_image.childImageSharp.sizes.srcSet}
            />
            <MarkdownContent
              className={classnames('e-content', !post.frontmatter.title && 'p-name')}
              html={post.html}
            />
            <div className="hidden">
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
          <Divider spacing="large" />
          <Container>
            <HCardPostFooter icon={data.icon} author={data.site.siteMetadata.author} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default PhotoTemplate

export const query = graphql`
  query PhotoTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
          email
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    icon: imageSharp(id: { regex: "/assets/images/resir014-icon.jpg/" }) {
      sizes(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpSizes
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
        header_image {
          childImageSharp {
            sizes(maxWidth: 1140) {
              srcSet
              src
            }
          }
        }
      }
    }
  }
`
