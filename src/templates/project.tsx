import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { menuItems } from '../utils/menus'

import Button from '../components/Button'
import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PageSubtitle from '../components/PageSubtitle'
import MarkdownContent from '../components/MarkdownContent'
import PageContent from '../components/PageContent'
import PageTitle from '../components/PageTitle'
import PostMeta from '../components/PostMeta'
import PostMetaDate from '../components/PostMetaDate'
import PostMetaCategory from '../components/PostMetaCategory'

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
      }
    }
  }
}

const ProjectFooter = styled.div`
  margin-top: 2rem;
`

const ProjectPageTemplate: React.SFC<ProjectTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <React.Fragment>
      <Helmet
        title={`${post.frontmatter.title} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title },
          { property: 'og:description', content: post.fields.lead || post.excerpt },
        ]}
      />
      <main>
        <article>
          <PageHeader headerImage={post.fields.headerImage || null}>
          <PostMeta hasBottomMargin={true}>
            <PostMetaDate>{post.fields.year}</PostMetaDate>
            {post.fields.category ? <PostMetaCategory>{post.fields.category}</PostMetaCategory> : null}
          </PostMeta>
          <PageTitle><span>{post.frontmatter.title}</span></PageTitle>
          </PageHeader>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <PageContent>
              <MarkdownContent html={post.html} />
            </PageContent>
            {post.fields.jumpToProject === 'true' || post.fields.project_url ? (
              <ProjectFooter>
                {renderLink(post.fields.project_url, true)}
              </ProjectFooter>
            ) : (
              null
            )}
          </Container>
        </article>
      </main>
    </React.Fragment>
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
        headerImage
        lead
        project_url
        jumpToProject
      }
      frontmatter {
        title
      }
    }
  }
`
