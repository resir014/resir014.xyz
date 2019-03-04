import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { SiteMetadata, HCardIcon } from '../types/gatsby'

import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import PageSubtitle from '../components/page/PageSubtitle'
import MarkdownContent from '../components/page/MarkdownContent'
import Page from '../components/page/Page'
import PageTitle from '../components/page/PageTitle'
import PageContent from '../components/page/PageContent'
import PostMetaItem from '../components/post/PostMetaItem'
import PostThumbnail from '../components/post/PostThumbnail'
import ProjectFooter from '../components/projects/ProjectFooter'
import PostThumbnailImage from '../components/post/PostThumbnailImage'
import PostHeader from '../components/post/PostHeader'
import PostMeta from '../components/post/PostMeta'
import TemplateWrapper from '../layouts'
import PageHeader from '../components/page/PageHeader'

interface ProjectTemplateProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        category: string
        year: string
        slug: string
        layout?: string
        headerImage?: string
        description?: string
        lead?: string
        project_url: string
        jumpToProject: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
        header_image?: {
          childImageSharp: {
            fluid: { [key: string]: any }
          }
        }
      }
    }
  }
}

const ProjectPageTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => {
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
          {post.frontmatter.header_image ? (
            <Container size="xl">
              <PostThumbnail>
                <PostThumbnailImage
                  fluid={post.frontmatter.header_image.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </PostThumbnail>
              <PostHeader>
                <PostMeta>
                  <PostMetaItem className="p-category">projects</PostMetaItem>
                  <PostMetaItem>{post.fields.year}</PostMetaItem>
                  {post.fields.category ? (
                    <PostMetaItem>{post.fields.category}</PostMetaItem>
                  ) : null}
                  <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
                </PostMeta>
                {post.fields.lead ? (
                  <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
                ) : null}
              </PostHeader>
            </Container>
          ) : (
            <PageHeader>
              <PostMeta>
                <PostMetaItem className="p-category">projects</PostMetaItem>
                <PostMetaItem>{post.fields.year}</PostMetaItem>
                {post.fields.category ? <PostMetaItem>{post.fields.category}</PostMetaItem> : null}
                <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
              </PostMeta>
              {post.fields.lead || post.fields.description ? (
                <PageSubtitle className="p-summary">
                  {post.fields.lead || post.fields.description}
                </PageSubtitle>
              ) : null}
            </PageHeader>
          )}
          <PageContent hasHeaderImage={!!post.frontmatter.header_image}>
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

const renderLink = (url: string, jumpToProject: boolean) => (
  <Button
    kind="link"
    color="primary"
    href={url}
    target={jumpToProject ? '_blank' : undefined}
    rel={jumpToProject ? 'noopener noreferrer' : undefined}
  >
    Visit project
  </Button>
)

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
        layout
        lead
        project_url
        jumpToProject
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
