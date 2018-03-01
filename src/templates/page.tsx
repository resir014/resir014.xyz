import * as React from 'react'
import Helmet from 'react-helmet'

import { menuItems } from '../utils/menus'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/ui/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/page/PageHeader'
import PageSubtitle from '../components/PageSubtitle'
import MarkdownContent from '../components/MarkdownContent'
import PageContent from '../components/PageContent'
import PageTitle from '../components/PageTitle'
import Page from '../components/page/Page'

interface PageTemplateProps {
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
        slug: string
        layout?: string
        headerImage?: string
        lead?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
      }
    }
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data, location }) => {
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
          { property: 'og:description', content: post.fields.lead || post.excerpt },
        ]}
      />

      <PageHeader>
        <PageTitle><span>{post.frontmatter.title}</span></PageTitle>
      </PageHeader>
      <article>
        <Container>
          {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
          <PageContent>
            <MarkdownContent html={post.html} />
          </PageContent>
        </Container>
      </article>
    </Page>
  )
}

export default PageTemplate

export const query = graphql`
  query PageQuery($slug: String!) {
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
        slug
        layout
        headerImage
        lead
      }
      frontmatter {
        title
      }
    }
  }
`
