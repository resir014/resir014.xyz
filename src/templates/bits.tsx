import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { css, merge } from 'glamor'
import Helmet from 'react-helmet'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import { menuItems } from '../utils/menus'
import { colors } from '../utils/theme'
import { highlightedText, sectionHeading } from '../utils/mixins'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PageSubtitle from '../components/PageSubtitle'
import MarkdownContent from '../components/MarkdownContent'
import PageContent from '../components/PageContent'

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

const postMetaClass = css({
  marginBottom: 0,
  fontSize: '80%'
})

const postMetaDateClass = css(merge(sectionHeading(colors.white, 0, '.5rem')))

const postMetaCategoryClass = css(merge(sectionHeading(colors.white, 0, '.5rem'), {
  marginLeft: '.5rem'
}))

const PageTemplate: React.SFC<BitsTemplateProps & LayoutState> = ({ data, location, sidebarVisible }) => {
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
      <Masthead
        title={data.site.siteMetadata.title}
        items={menuItems}
        pathname={pathname}
        transparent={true}
      />
      <ToggleMenu items={menuItems} pathname={pathname} visible={sidebarVisible} />
      <main>
        <article>
          <PageHeader headerImage={post.fields.headerImage || null}>
            <div className={`${postMetaClass}`}>
              <span className={`${postMetaDateClass}`}>{post.fields.date}</span>
              {post.fields.category ? <span className={`${postMetaCategoryClass}`}>{post.fields.category}</span> : null}
            </div>
          </PageHeader>
          <Container>
            <PageContent>
              <MarkdownContent html={post.html} />
            </PageContent>
          </Container>
        </article>
      </main>
      <Footer title={data.site.siteMetadata.title} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, BitsTemplateProps>(mapStateToProps)(PageTemplate)

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
