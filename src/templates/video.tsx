import * as React from 'react'
import classnames from 'classnames'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { HCardIcon, SiteMetadata } from '../types/gatsby'
import { VideoNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import {
  Page,
  PageHeader,
  PageMeta,
  PageMetaItem,
  PageContent,
  MarkdownContent
} from '../chungking/components/page'
import { HCardPost } from '../chungking/components/indieweb'
import { Container } from '../chungking/components/ui'
import { ResponsiveVideo, VideoCard } from '../chungking/components/video'

interface VideoTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: VideoNode
  }
}

const VideoTemplate: React.SFC<VideoTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title || 'Video posted by @resir014'} · ${siteMetadata.title}`}
          meta={[
            { name: 'description', content: post.fields.lead || post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            {
              property: 'og:title',
              content: post.frontmatter.title || 'Video posted by @resir014'
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
                    <ResponsiveVideo>
                      <iframe
                        title={post.fields.youtube_embed_id}
                        src={`https://www.youtube-nocookie.com/embed/${
                          post.fields.youtube_embed_id
                        }?rel=0`}
                        allowFullScreen
                      />
                    </ResponsiveVideo>
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
      </Page>
    </TemplateWrapper>
  )
}

export default VideoTemplate

export const pageQuery = graphql`
  query VideoTemplateQuery($slug: String!) {
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
