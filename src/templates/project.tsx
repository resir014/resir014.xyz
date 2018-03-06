import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { menuItems } from '../utils/menus'

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

interface ProjectTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        category: string
        year: string
        slug: string
        layout?: string
        headerImage?: string
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
            sizes: { [key: string]: any }
          }
        }
      }
    }
  }
}

const ProjectPageTemplate: React.SFC<ProjectTemplateProps> = ({
  data,
  location
}) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
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
      <article>
        <PostHeader>
          <PostMeta>
            <PostMetaItem>projects</PostMetaItem>
            <PostMetaItem>{post.fields.year}</PostMetaItem>
            {post.fields.category ? (
              <PostMetaItem>{post.fields.category}</PostMetaItem>
            ) : null}
            <PageTitle>{post.frontmatter.title}</PageTitle>
          </PostMeta>
        </PostHeader>
        {post.frontmatter.header_image && (
          <PostThumbnail>
            <PostThumbnailImage
              sizes={post.frontmatter.header_image.childImageSharp.sizes}
              alt={post.frontmatter.title}
            />
          </PostThumbnail>
        )}
        <PageContent>
          <Container>
            {post.fields.lead ? (
              <PageSubtitle>{post.fields.lead}</PageSubtitle>
            ) : null}
            <MarkdownContent html={post.html} />
            {post.fields.jumpToProject === 'true' || post.fields.project_url ? (
              <ProjectFooter>
                {renderLink(post.fields.project_url, true)}
              </ProjectFooter>
            ) : null}
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

const renderLink = (url: string, jumpToProject: boolean) => (
  <Button
    kind="link"
    color="primary"
    href={url}
    target={jumpToProject ? '_blank' : null}
    rel={jumpToProject ? 'noopener noreferrer' : null}
  >
    Visit project
  </Button>
)

export default ProjectPageTemplate

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
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
            sizes(maxWidth: 1140) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
