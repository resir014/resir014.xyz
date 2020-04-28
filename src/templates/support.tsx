import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { RouterProps } from '@reach/router'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PageNode } from '../types/nodes'

import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageThumbnail,
  PageThumbnailImage,
  MarkdownContent
} from '../components/page'
import { Box, Stack, Heading, Text } from '../components/chungking-core'
import { Container } from '../components/layout'
import { LiveCTALink } from '../components/ui'
import { PageWrapper } from '../layouts'

interface SupportPageTemplateProps extends RouterProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: PageNode
  }
}

const SupportPageTemplate: React.SFC<SupportPageTemplateProps> = ({ data, location }) => {
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
            <Stack spacing="xl" mt="xxl">
              <Stack spacing="lg">
                <Heading scale={800}>Support my stream!</Heading>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="md" mt="xl">
                  <LiveCTALink
                    isExternal
                    backgroundColor="#faae2b"
                    color="grey90"
                    to="https://www.twitch.tv/resir014"
                  >
                    Saweria*
                  </LiveCTALink>
                  <LiveCTALink
                    isExternal
                    backgroundColor="#128079"
                    to="https://streamlabs.com/support"
                  >
                    Streamlabs
                  </LiveCTALink>
                </Box>
              </Stack>
            </Stack>
            <Stack spacing="xl" mt="xxl">
              <Stack spacing="lg">
                <Heading scale={800}>Support my work!</Heading>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="md" mt="xl">
                  <LiveCTALink
                    isExternal
                    backgroundColor="grey90"
                    to="https://karyakarsa.com/resir014"
                  >
                    Karyakarsa*
                  </LiveCTALink>
                  <LiveCTALink
                    isExternal
                    backgroundColor="#be1e2d"
                    to="https://trakteer.id/resir014"
                  >
                    Trakteer*
                  </LiveCTALink>
                  <LiveCTALink isExternal backgroundColor="#29abe0" to="https://ko-fi.com/resir014">
                    Ko-fi
                  </LiveCTALink>
                </Box>
              </Stack>
              <Box>
                <Text>(*Indonesia only.)</Text>
              </Box>
            </Stack>
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

export default SupportPageTemplate

export const pageQuery = graphql`
  query SupportPageQuery($slug: String!) {
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
