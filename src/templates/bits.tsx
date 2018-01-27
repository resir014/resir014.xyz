import * as React from 'react'
import Helmet from 'react-helmet'

import { menuItems } from '../utils/menus'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PageSubtitle from '../components/PageSubtitle'
import MarkdownContent from '../components/MarkdownContent'
import PageContent from '../components/PageContent'
import PostMetaDate from '../components/PostMetaDate'
import PostMetaCategory from '../components/PostMetaCategory'
import PostMeta from '../components/PostMeta'

interface BitsTemplateProps {
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
        category?: string
        headerImage?: string
        lead?: string
        date: string
        date_ogp?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
      }
    }
  }
}

const PageTemplate: React.SFC<BitsTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <React.Fragment>
      <Helmet
        title={`${post.frontmatter.title || post.fields.lead || post.excerpt} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title || post.fields.lead || post.excerpt },
          { property: 'og:description', content: post.fields.lead || post.excerpt },
        ]}
      />
      <main>
        <article>
          <PageHeader headerImage={post.fields.headerImage || null}>
            <PostMeta>
              <PostMetaDate>{post.fields.date}</PostMetaDate>
              {post.fields.category ? <PostMetaCategory>{post.fields.category}</PostMetaCategory> : null}
            </PostMeta>
          </PageHeader>
          <Container>
            <PageContent>
              <MarkdownContent html={post.html} />
            </PageContent>
          </Container>
        </article>
      </main>
    </React.Fragment>
  )
}

export default PageTemplate

export const query = graphql`
  query BitsQuery($slug: String!) {
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
        category
        link
        headerImage
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
