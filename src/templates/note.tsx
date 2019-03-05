import * as React from 'react'
import classnames from 'classnames'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { NotesNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Container } from '../chungking/components/ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageMeta,
  PageMetaItem,
  PageContent,
  MarkdownContent
} from '../chungking/components/page'
import { HCardPost } from '../chungking/components/indieweb'

interface NoteTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: NotesNode
  }
}

const NoteTemplate: React.SFC<NoteTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title || post.fields.lead || post.excerpt} · ${
            siteMetadata.title
          }`}
          meta={[
            { name: 'description', content: post.fields.lead || post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            {
              property: 'og:title',
              content: post.frontmatter.title || 'Note posted by @resir014'
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
            <HCardPost icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
            {post.frontmatter.title && (
              <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
            )}
          </PageHeader>
          <PageContent>
            <Container>
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
      </Page>
    </TemplateWrapper>
  )
}

export default NoteTemplate

export const pageQuery = graphql`
  query NoteTemplateQuery($slug: String!) {
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
