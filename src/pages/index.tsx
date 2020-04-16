import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata, HeaderImage, HCardIcon } from '../types/gatsby'
import { ProjectField, BlogPostField } from '../types/fields'
import { ProjectNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Page } from '../components/page'
import { Divider, NavLinkButton } from '../components/ui'
import { HCard } from '../components/indieweb'
import { FeaturedProject } from '../components/projects'
import {
  HomepageHero,
  HomepageHeroText,
  HomepageContent,
  HomepageSection,
  HomepageSectionFooter,
  HomepageSectionTitle
} from '../components/home'
import { BlogPostItem } from '../components/posts-index'

interface IndexPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    headerImage: HeaderImage
    icon: HCardIcon
    featuredPosts: {
      edges: BlogPostField[]
    }
    featuredProject: ProjectNode
    allProjects: {
      edges: ProjectField[]
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const { edges: recentPosts } = data.featuredPosts
  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            { property: 'og:title', content: 'Home' },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description
            }
          ]}
        />
        <HomepageHero>
          <HomepageHeroText
            title="@resir014"
            flavour={process.env.GATSBY_HOMEPAGE_SPLASH_TEXT || data.site.siteMetadata.flavourText}
          />
        </HomepageHero>
        <HomepageContent>
          <HomepageSection>
            <HomepageSectionTitle>Recent posts</HomepageSectionTitle>
            {recentPosts.map(({ node }) => (
              <BlogPostItem key={node.fields.slug} node={node} />
            ))}
            <HomepageSectionFooter>
              <NavLinkButton size="lg" to="/posts">
                View more posts
              </NavLinkButton>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" center />
          <HomepageSection>
            <HomepageSectionTitle>Projects</HomepageSectionTitle>
            <FeaturedProject node={data.featuredProject} />
            <HomepageSectionFooter>
              <NavLinkButton size="lg" to="/projects">
                View more of my stuff
              </NavLinkButton>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" center />
          <HomepageSection>
            <HCard icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
          </HomepageSection>
        </HomepageContent>
      </Page>
    </TemplateWrapper>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        flavourText
        author {
          name
          description
          website
          email
          url {
            twitter
            mastodon
            instagram
            tumblr
            github
          }
        }
      }
    }
    headerImage: file(absolutePath: { regex: "/assets/images/architect.svg$/" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    featuredPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [fields___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
            layout
            category
            link
            lead
            youtube_embed_id
            date(formatString: "DD MMMM YYYY")
            date_ogp: date
          }
          frontmatter {
            title
            header_image {
              childImageSharp {
                fluid(maxWidth: 1140) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
    featuredProject: markdownRemark(fields: { slug: { eq: "/projects/web/kawalcovid19.id/" } }) {
      excerpt
      html
      fields {
        year
        description
        tags
        slug
        category
        lead
        project_url
        jumpToProject
      }
      frontmatter {
        title
        header_image {
          childImageSharp {
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allProjects: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/" } } }
      sort: { fields: [fields___year], order: DESC }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            year
            description
            tags
            slug
            category
            lead
            project_url
            jumpToProject
          }
          frontmatter {
            title
            header_image {
              childImageSharp {
                fluid(maxWidth: 1140) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
