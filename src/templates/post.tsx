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
import PostMeta from '../components/PostMeta'
import PostMetaDate from '../components/PostMetaDate'
import PostMetaCategory from '../components/PostMetaCategory'
import PageTitle from '../components/PageTitle'

interface PostTemplateProps {
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

const PostTemplate: React.SFC<PostTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <React.Fragment>
      <Helmet
        title={`${post.frontmatter.title} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title },
          { property: 'og:description', content: post.fields.lead || post.excerpt },
          { property: 'og:type', content: 'article' },
          { property: 'og:article:author', content: siteMetadata.author.name },
          { property: 'og:article:published_time', content: post.fields.date_ogp },
        ]}
      />
      <main>
        <article>
          <PageHeader headerImage={post.fields.headerImage || null}>
            <PostMeta hasBottomMargin={true}>
              <PostMetaDate>{post.fields.date}</PostMetaDate>
              {post.fields.category ? <PostMetaCategory>{post.fields.category}</PostMetaCategory> : null}
            </PostMeta>
            <PageTitle><span>{post.frontmatter.title}</span></PageTitle>
          </PageHeader>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <PageContent>
              <MarkdownContent html={post.html} />
            </PageContent>
          </Container>
        </article>
      </main>
    </React.Fragment>
  )
}

export default PostTemplate

export const query = graphql`
  query PostQuery($slug: String!) {
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
