import React from 'react'
import classnames from 'clsx'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { RouterProps } from '@reach/router'

import { PostData } from '../types/gatsby'
import { PhotoNode } from '../types/nodes'

import { Container } from '../components/layout'
import {
  PageHeader,
  PageMeta,
  PageMetaItem,
  PageTitle,
  PageContent,
  MarkdownContent
} from '../components/page'
import { HCardPost } from '../components/indieweb'
import { PageWrapper } from '../layouts'

interface PhotoTemplateProps extends RouterProps {
  data: PostData<PhotoNode>
}

const PhotoTemplate: React.SFC<PhotoTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const pageTitle = post.frontmatter.title || 'Photo posted by @resir014'

  return (
    <PageWrapper pageTitle={`${pageTitle} &middot; ${siteMetadata.title}`}>
      <Helmet>
        <meta name="description" content={post.fields.lead || post.excerpt} />
        <meta name="author" content={siteMetadata.author.name} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={post.fields.lead || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${siteMetadata.siteUrl}${location ? location.pathname : ''}`}
        />
        {post.frontmatter.header_image && (
          <meta
            property="og:image"
            content={`${siteMetadata.siteUrl}${post.frontmatter.header_image.childImageSharp.fixed.src}`}
          />
        )}
        {post.frontmatter.header_image && (
          <meta
            property="og:image:width"
            content={`${post.frontmatter.header_image.childImageSharp.fixed.width}`}
          />
        )}
        {post.frontmatter.header_image && (
          <meta
            property="og:image:height"
            content={`${post.frontmatter.header_image.childImageSharp.fixed.height}`}
          />
        )}
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
          {post.frontmatter.title && (
            <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
          )}
        </PageHeader>
        <PageContent>
          <Container>
            {post.frontmatter.header_image && (
              <img
                className="u-photo"
                src={post.frontmatter.header_image.childImageSharp.fluid.src}
                alt={post.frontmatter.title || 'Photo posted by @resir014'}
                srcSet={post.frontmatter.header_image.childImageSharp.fluid.srcSet}
              />
            )}
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
        </PageContent>
      </article>
    </PageWrapper>
  )
}

export default PhotoTemplate

export const pageQuery = graphql`
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
        header_image {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
