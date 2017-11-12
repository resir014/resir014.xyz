import * as React from 'react'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { sectionHeading, highlightedText } from '../utils/mixins'
import { colors, headerColors, breakpoints, widths } from '../utils/theme'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { PageSubtitle } from '../components/PageSubtitle'
import { MarkdownContent } from '../components/MarkdownContent'

const postMetaClass = css({
  marginBottom: '.5rem',
  fontSize: '80%'
})

const postMetaDateClass = css(merge(sectionHeading(colors.white, 0, '.5rem')))

const postMetaCategoryClass = css(merge(sectionHeading(colors.white, 0, '.5rem'), {
  marginLeft: '.5rem'
}))

const postTitleClass = css({
  margin: 0,
  '& span': merge(sectionHeading(colors.white, '.25rem', '.5rem'))
})

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

const PageTemplate: React.SFC<PageProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <div>
      <Masthead title={data.site.siteMetadata.title} />
      <main>
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
          <PageHeader headerImage={post.fields.headerImage || null}>
            <div className={`${postMetaClass}`}>
              <span className={`${postMetaDateClass}`}>{post.fields.date}</span>
              {post.fields.category ? <span className={`${postMetaCategoryClass}`}>{post.fields.category}</span> : null}
            </div>
            <h1 className={`${postTitleClass}`}><span>{post.frontmatter.title}</span></h1>
          </PageHeader>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <MarkdownContent html={post.html} />
          </Container>
        </article>
      </main>
      <Footer title={data.site.siteMetadata.title} />
    </div>
  )
}

export default PageTemplate

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
