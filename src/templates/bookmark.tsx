import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'react-emotion'

import { SiteAuthor } from '../utils/types'
import { colors } from '../styles/variables'

import Container from '../components/ui/Container'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import PostHeader from '../components/post/PostHeader'
import PostMetaItem from '../components/post/PostMetaItem'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PostTitle from '../components/post/PostTitle'
import MarkdownContent from '../components/page/MarkdownContent'
import HCardPostFooter from '../components/indieweb/HCardPostFooter'
import TemplateWrapper from '../layouts'

interface BookmarkTemplateProps {
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
      childImageSharp: {
        fluid: { [key: string]: any }
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
        date_ogp: string
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

    &:hover,
    &:focus {
      color: ${colors.blue70};
    }
  }
`

const BookmarkTemplate: React.SFC<BookmarkTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title || 'Bookmark posted by @resir014'} · ${
            siteMetadata.title
          }`}
          meta={[
            { name: 'description', content: post.fields.lead || post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            {
              property: 'og:title',
              content: post.frontmatter.title || 'Bookmark posted by @resir014'
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
              <LinkTitle>
                <a
                  className="u-bookmark-of h-cite p-name"
                  href={post.fields.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.frontmatter.title}
                </a>{' '}
                &raquo;
              </LinkTitle>
            </PostMeta>
          </PostHeader>
          <PageContent>
            <Container>
              {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
              <MarkdownContent className="e-content" html={post.html} />
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
              <HCardPostFooter
                icon={data.icon.childImageSharp}
                author={data.site.siteMetadata.author}
              />
            </Container>
          </PageContent>
        </article>
      </Page>
    </TemplateWrapper>
  )
}

export default BookmarkTemplate

export const pageQuery = graphql`
  query BookmarkTemplateQuery($slug: String!) {
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
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
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
