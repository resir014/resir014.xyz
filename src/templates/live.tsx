import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { RouterProps } from '@reach/router'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PageNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

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
import { Box } from '../components/chungking-core'
import { Container, PageWrapper } from '../components/layout'
import { LiveCTALink } from '../components/ui'

interface LivePageTemplateProps extends RouterProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: PageNode
  }
}

const LivePageTemplate: React.SFC<LivePageTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <PageWrapper pageTitle={`${post.frontmatter.title} · ${siteMetadata.title}`}>
      <Helmet>
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
            <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="md" mt="xl">
              <LiveCTALink isExternal backgroundColor="#9146FF" to="https://www.twitch.tv/resir014">
                Follow Me!
              </LiveCTALink>
              <LiveCTALink backgroundColor="magenta30" to="/support">
                Tip Jar
              </LiveCTALink>
            </Box>
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

export default LivePageTemplate

export const pageQuery = graphql`
  query LivePageQuery($slug: String!) {
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
