import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PageNode } from '../types/nodes'

import Container from '../components/ui/Container'
import MarkdownContent from '../components/page/MarkdownContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PageContent from '../components/page/PageContent'
import PageTitle from '../components/page/PageTitle'
import Page from '../components/page/Page'
import PostThumbnail from '../components/post/PostThumbnail'
import PostThumbnailImage from '../components/post/PostThumbnailImage'
import PostHeader from '../components/post/PostHeader'
import PostMeta from '../components/post/PostMeta'
import TemplateWrapper from '../layouts'

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
            <PostThumbnail>
              <PostThumbnailImage
                fluid={post.frontmatter.header_image.childImageSharp.fluid}
                alt={post.frontmatter.title}
              />
            </PostThumbnail>
          )}
          <PostHeader>
            <PostMeta>
              <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
            </PostMeta>
            {post.fields.lead ? (
              <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
            ) : null}
          </PostHeader>
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
