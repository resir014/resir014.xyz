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

interface ProjectTemplateProps {
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
        category: string
        year: string
        slug: string
        layout?: string
        headerImage?: string
        lead?: string
        project_url: string
        jumpToProject: string
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

const pageMetaClass = css({
  marginBottom: '.5rem',
  fontSize: '80%'
})

const pageMetaSectionClass = css(merge(sectionHeading(photonColors.white, 0, '.5rem')))

const pageMetaCategoryClass = css(merge(sectionHeading(photonColors.white, 0, '.5rem'), {
  marginLeft: '.5rem'
}))

const pageFooterClass = css({
  marginTop: '2rem',
  '& .project__footer-link': sharedStyles.sectionFooterLink
})

const ProjectPageTemplate: React.SFC<ProjectTemplateProps & LayoutState> = ({ data, location, sidebarVisible }) => {
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
            <div className={`${pageMetaClass}`}>
              <span className={`${pageMetaSectionClass}`}>{post.fields.year}</span>
              {post.fields.category ? <span className={`${pageMetaCategoryClass}`}>{post.fields.category}</span> : null}
            </div>
            <h1 className={`${pageTitleClass}`}><span>{post.frontmatter.title}</span></h1>
          </PageHeader>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <PageContent>
              <MarkdownContent html={post.html} />
            </PageContent>
            {post.fields.jumpToProject === 'true' || post.fields.project_url
              ? <div className={`${pageFooterClass}`}>
                {renderLink(post.fields.project_url)}
              </div>
              : null}
          </Container>
        </article>
      </main>
      <Footer title={data.site.siteMetadata.title} />
    </React.Fragment>
  )
}

const renderLink = (url: string) => (
  <a className="project__footer-link" href={url} target="_blank" rel="noopener noreferrer">Visit project</a>
)

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, ProjectTemplateProps>(mapStateToProps)(ProjectPageTemplate)

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
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
        category
        year
        slug
        layout
        headerImage
        lead
        project_url
        jumpToProject
      }
      frontmatter {
        title
      }
    }
  }
`
