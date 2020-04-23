import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { RouterProps } from '@reach/router'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PageNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Container } from '../components/layout'
import {
  Page,
  PageHeader,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageThumbnail,
  PageThumbnailImage,
  MarkdownContent
} from '../components/page'

interface PageTemplateProps extends RouterProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: PageNode
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet>
          <title>
            {post.frontmatter.title} &middot; {siteMetadata.title}
          </title>
          <meta name="description" content={post.fields.lead || post.excerpt} />
          <meta name="author" content={siteMetadata.author.name} />
          <meta property="og:title" content={post.frontmatter.title} />
          <meta property="og:description" content={post.fields.lead || post.excerpt} />
          <meta
            property="og:url"
            content={`${siteMetadata.siteUrl}${location ? location.pathname : ''}`}
          />
          {post.frontmatter.header_image && (
            <meta
              property="og:image"
              content={`${siteMetadata.siteUrl}${post.frontmatter.header_image.childImageSharp.fluid.src}`}
            />
          )}
        </Helmet>
        <article className="h-entry">
          {post.frontmatter.header_image && (
            <PageThumbnail>
              <PageThumbnailImage
                fluid={post.frontmatter.header_image.childImageSharp.fluid}
                alt={post.frontmatter.title}
              />
            </PageThumbnail>
          )}
          <PageHeader>
            <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
            {post.fields.lead ? (
              <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
            ) : null}
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
      </Page>
    </TemplateWrapper>
  )
}

export default PageTemplate

export const pageQuery = graphql`
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
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
