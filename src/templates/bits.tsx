import * as React from 'react'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { colors } from '../utils/theme'
import { highlightedText } from '../utils/mixins'

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

const postHeaderBitsClass = css({
  marginTop: '3rem',

  '& .post-meta': {
    '& span': merge(highlightedText(colors.black, 0, '.25rem'), {
      color: colors.white
    })
  }
})

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
          ]}
        />
        <article>
          <header className={`${postHeaderBitsClass}`}>
            <Container>
              <div className="post-meta"><span>{post.fields.date}</span></div>
            </Container>
          </header>
          <Container>
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
