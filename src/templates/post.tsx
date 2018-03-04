import * as React from 'react'
import Helmet from 'react-helmet'

import { menuItems } from '../utils/menus'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PostMetaDate from '../components/PostMetaDate'
import PostMetaCategory from '../components/PostMetaCategory'
import Container from '../components/ui/Container'
import MarkdownContent from '../components/page/MarkdownContent'
import PageTitle from '../components/PageTitle'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import Page from '../components/page/Page'
import HeaderImage from '../components/page/HeaderImage'
import PostHeader from '../components/post/PostHeader'
import PostMeta from '../components/post/PostMeta'
import PostThumbnail from '../components/post/PostThumbnail'

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
    headerImage: {
      sizes: { [key: string]: any }
    }
  }
}

const PostTemplate: React.SFC<PostTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { pathname } = location

  return (
    <Page>
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
      <article>
        <PostHeader>
          <PostMeta hasBottomMargin={true}>
            <PostMetaDate>{post.fields.date}</PostMetaDate>
            {post.fields.category ? <PostMetaCategory>{post.fields.category}</PostMetaCategory> : null}
          </PostMeta>
          <PageTitle><span>{post.frontmatter.title}</span></PageTitle>
        </PostHeader>
        {post.fields.headerImage && (
          <PostThumbnail>
            <img src={post.fields.headerImage} alt="" />
          </PostThumbnail>
        )}
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
