import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteAuthor } from '../types/default'
import { HCardIcon } from '../types/gatsby'
import { BlogPostNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import {
  MarkdownContent,
  Page,
  PageHeader,
  PageThumbnail,
  PageThumbnailImage,
  PageMeta,
  PageMetaItem,
  PageTitle,
  PageSubtitle,
  PageContent
} from '../components/page'
import { HCardPost } from '../components/indieweb'
import { Container, MessageBox } from '../components/ui'
import { P, UL, LI } from '../components/chungking-core'

interface PostTemplateProps {
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
    icon: HCardIcon
    markdownRemark: BlogPostNode
  }
}

const PostTemplate: React.SFC<PostTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title} · ${siteMetadata.title}`}
          meta={[
            { name: 'description', content: post.fields.lead || post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            { property: 'og:title', content: post.frontmatter.title },
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
          {post.frontmatter.header_image ? (
            <Container size="xl">
              <PageThumbnail>
                <PageThumbnailImage
                  fluid={post.frontmatter.header_image.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </PageThumbnail>
            </Container>
          ) : null}
          <PageHeader
            metaItem={
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
            }
          >
            <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
            {post.fields.lead ? (
              <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
            ) : null}
            <HCardPost icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
          </PageHeader>
          <PageContent>
            <Container>
              {post.frontmatter.syndication && (
                <MessageBox>
                  <P>This post is also published on:</P>
                  <UL>
                    {post.frontmatter.syndication.map(s => (
                      <LI key={s.name}>
                        <a
                          href={s.url}
                          target="_blank"
                          className="u-syndication"
                          rel="noopener noreferrer external syndication"
                        >
                          {s.name}
                        </a>
                      </LI>
                    ))}
                  </UL>
                </MessageBox>
              )}
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

export default PostTemplate

export const pageQuery = graphql`
  query PostQuery($slug: String!) {
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
        syndication {
          name
          url
        }
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
