import * as React from 'react'
import Helmet from 'react-helmet'
import { RouterProps } from '@reach/router'
import { graphql } from 'gatsby'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { ProjectNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Container, AnchorButton } from '../components/ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  MarkdownContent,
  PageMeta,
  PageMetaItem,
  PageSubtitle
} from '../components/page'
import { ProjectCard, ProjectFooter } from '../components/projects'

interface ProjectTemplateProps extends RouterProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: ProjectNode
  }
}

const renderLink = (url: string, jumpToProject: boolean) => (
  <AnchorButton
    color="primary"
    size="lg"
    href={url}
    target={jumpToProject ? '_blank' : undefined}
    rel={jumpToProject ? 'noopener noreferrer' : undefined}
  >
    Visit project
  </AnchorButton>
)

const ProjectPageTemplate: React.SFC<ProjectTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const tags = post.fields.tags ? (JSON.parse(post.fields.tags) as string[]) : undefined

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
              content={`${siteMetadata.siteUrl}${post.frontmatter.header_image.childImageSharp.fixed}`}
            />
          )}
          {post.frontmatter.header_image && (
            <meta
              property="og:image:width"
              content={`${siteMetadata.siteUrl}${post.frontmatter.header_image.childImageSharp.fixed.width}`}
            />
          )}
          {post.frontmatter.header_image && (
            <meta
              property="og:image:height"
              content={`${siteMetadata.siteUrl}${post.frontmatter.header_image.childImageSharp.fixed.height}`}
            />
          )}
        </Helmet>
        <article className="h-entry">
          {post.frontmatter.header_image ? (
            <Container size="xl">
              <PageHeader
                metaItem={
                  <PageMeta>
                    <PageMetaItem className="p-category">projects</PageMetaItem>
                    <PageMetaItem>{post.fields.year}</PageMetaItem>
                    {post.fields.category ? (
                      <PageMetaItem>{post.fields.category}</PageMetaItem>
                    ) : null}
                  </PageMeta>
                }
              >
                <ProjectCard
                  title={post.frontmatter.title}
                  description={post.fields.lead || post.fields.description}
                  image={post.frontmatter.header_image}
                  tags={tags}
                />
              </PageHeader>
            </Container>
          ) : (
            <PageHeader>
              <PageMeta>
                <PageMetaItem className="p-category">projects</PageMetaItem>
                <PageMetaItem>{post.fields.year}</PageMetaItem>
                {post.fields.category ? <PageMetaItem>{post.fields.category}</PageMetaItem> : null}
              </PageMeta>
              <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
              {post.fields.lead || post.fields.description ? (
                <PageSubtitle className="p-summary">
                  {post.fields.lead || post.fields.description}
                </PageSubtitle>
              ) : null}
            </PageHeader>
          )}
          <PageContent>
            <Container>
              <MarkdownContent className="e-content" html={post.html} />
              {post.fields.jumpToProject === 'true' || post.fields.project_url ? (
                <ProjectFooter>{renderLink(post.fields.project_url, true)}</ProjectFooter>
              ) : null}
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

export default ProjectPageTemplate

export const pageQuery = graphql`
  query ProjectPageQuery($slug: String!) {
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
        category
        year
        slug
        tags
        layout
        description
        lead
        project_url
        jumpToProject
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
