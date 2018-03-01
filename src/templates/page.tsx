import * as React from 'react'
import Helmet from 'react-helmet'

import { menuItems } from '../utils/menus'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/ui/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/page/PageHeader'
import MarkdownContent from '../components/page/MarkdownContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PageContent from '../components/page/PageContent'
import PageTitle from '../components/page/PageTitle'
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
      <article>
        <PageHeader>
          <PageTitle>{post.frontmatter.title}</PageTitle>
        </PageHeader>
        <PageContent>
            <Container>
              {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
                <MarkdownContent html={post.html} />
            </Container>
        </PageContent>
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
