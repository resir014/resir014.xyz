import * as React from 'react'
import { graphql } from 'gatsby'
import { RouterProps } from '@reach/router'
import { Helmet } from 'react-helmet'

import { PostData } from '../types/gatsby'
import { BookmarkNode } from '../types/nodes'

import { Container } from '../components/layout'
import {
  PageHeader,
  PageSubtitle,
  PageContent,
  PageMeta,
  PageMetaItem,
  MarkdownContent,
  BookmarkLink
} from '../components/page'
import { HCardPost } from '../components/indieweb'
import { PageWrapper } from '../layouts'

interface BookmarkTemplateProps extends RouterProps {
  data: PostData<BookmarkNode>
}

const BookmarkTemplate: React.SFC<BookmarkTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const pageTitle = post.frontmatter.title || post.fields.lead || post.excerpt

  return (
    <PageWrapper pageTitle={`${pageTitle} · ${siteMetadata.title}`}>
      <Helmet>
        <meta name="description" content={post.fields.lead || post.excerpt} />
        <meta name="author" content={siteMetadata.author.name} />
        <meta
          property="og:title"
          content={post.frontmatter.title || 'Bookmark posted by @resir014'}
        />
        <meta property="og:description" content={post.fields.lead || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${siteMetadata.siteUrl}${location ? location.pathname : ''}`}
        />
        <meta property="article:author" content={siteMetadata.author.name} />
        <meta property="article:published_time" content={post.fields.date_ogp} />
        <meta property="article:section" content={post.fields.category} />
      </Helmet>
      <article className="h-entry">
        <PageHeader>
          <PageMeta>
            <PageMetaItem>
              <time
                className="dt-published"
                dateTime={new Date(post.fields.date_ogp).toISOString()}
              >
                {post.fields.date}
              </time>
            </PageMetaItem>
            {post.fields.category ? (
              <PageMetaItem className="p-category">{post.fields.category}</PageMetaItem>
            ) : null}
          </PageMeta>
          <HCardPost icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
          <BookmarkLink link={post.fields.link} title={post.frontmatter.title} />
          {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
        </PageHeader>
        <PageContent>
          <Container>
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
        </PageContent>
      </article>
    </PageWrapper>
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
