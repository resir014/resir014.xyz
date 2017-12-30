import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Helmet from 'react-helmet'
import { css, merge } from 'glamor'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import { menuItems } from '../utils/menus'
import { sectionHeading, highlightedText } from '../utils/mixins'
import { photonColors, sharedStyles } from '../utils/theme'

import { Masthead } from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import PageSubtitle from '../components/PageSubtitle'
import MarkdownContent from '../components/MarkdownContent'
import PageContent from '../components/PageContent'

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

const pageTitleClass = css(sharedStyles.pageTitle)

const PageTemplate: React.SFC<PageTemplateProps & LayoutState> = ({ data, location, sidebarVisible }) => {
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
            <h1 className={`${pageTitleClass}`}><span>{post.frontmatter.title}</span></h1>
          </PageHeader>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
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

export default connect<LayoutState, void, PageTemplateProps>(mapStateToProps)(PageTemplate)

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
