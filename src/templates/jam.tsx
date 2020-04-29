import * as React from 'react'
import classnames from 'clsx'
import { graphql } from 'gatsby'
import { RouterProps } from '@reach/router'
import { Helmet } from 'react-helmet'

import { PostData } from '../types/gatsby'
import { JamNode } from '../types/nodes'

import {
  PageHeader,
  PageMeta,
  PageMetaItem,
  PageContent,
  MarkdownContent
} from '../components/page'
import { HCardPost } from '../components/indieweb'
import { Container } from '../components/layout'
import { VideoCard, LiteYouTube } from '../components/video'
import { PageWrapper } from '../layouts'

interface JamTemplateProps extends RouterProps {
  data: PostData<JamNode>
}

const JamTemplate: React.SFC<JamTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const pageTitle = post.frontmatter.title || post.fields.lead || post.excerpt

  return (
    <PageWrapper pageTitle={`${pageTitle} · ${siteMetadata.title}`}>
      <Helmet>
        <meta name="description" content={post.fields.lead || post.excerpt} />
        <meta name="author" content={siteMetadata.author.name} />
        <meta property="og:title" content={post.frontmatter.title || 'Jam posted by @resir014'} />
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
        </PageHeader>
        <PageContent>
          <Container>
            <VideoCard
              title={post.frontmatter.title}
              embed={
                post.fields.youtube_embed_id ? (
                  <LiteYouTube videoId={post.fields.youtube_embed_id} />
                ) : null
              }
            >
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
            </VideoCard>
          </Container>
        </PageContent>
      </article>
    </PageWrapper>
  )
}

export default JamTemplate

export const pageQuery = graphql`
  query JamTemplateQuery($slug: String!) {
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
        youtube_embed_id
        date(formatString: "DD MMMM YYYY")
        date_ogp: date
      }
      frontmatter {
        title
      }
    }
  }
`
