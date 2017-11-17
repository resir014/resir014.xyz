import * as React from 'react'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { colors } from '../utils/theme'
import { highlightedText, sectionHeading } from '../utils/mixins'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { PageSubtitle } from '../components/PageSubtitle'
import { MarkdownContent } from '../components/MarkdownContent'

interface PageProps {
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

const postMetaClass = css({
  marginBottom: 0,
  fontSize: '80%'
})

const postMetaDateClass = css(merge(sectionHeading(colors.white, 0, '.5rem')))

const postMetaCategoryClass = css(merge(sectionHeading(colors.white, 0, '.5rem'), {
  marginLeft: '.5rem'
}))

const PageTemplate: React.SFC<PageProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <main>
      <Helmet
        title={`${post.frontmatter.title} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title },
          { property: 'og:description', content: post.fields.lead || post.excerpt },
        ]}
      />
      <article>
        <PageHeader headerImage={post.fields.headerImage || null}>
          <div className={`${postMetaClass}`}>
            <span className={`${postMetaDateClass}`}>{post.fields.date}</span>
            {post.fields.category ? <span className={`${postMetaCategoryClass}`}>{post.fields.category}</span> : null}
          </div>
        </PageHeader>
        <Container>
          <MarkdownContent html={post.html} />
        </Container>
      </article>
    </main>
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
