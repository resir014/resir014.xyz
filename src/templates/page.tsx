import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PageNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Container } from '../chungking/components/ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageThumbnail,
  PageThumbnailImage,
  MarkdownContent
} from '../chungking/components/page'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: PageNode
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
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
