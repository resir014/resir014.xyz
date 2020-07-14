import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { css } from '@emotion/core'

import { HCardIcon, SiteData } from '../types/gatsby'
import { ProjectField, BlogPostField } from '../types/fields'
import { ProjectNode } from '../types/nodes'

import { TemplateWrapper } from '../layouts'

import { Page } from '../components/page'
import { HCard } from '../components/indieweb'
import { NavLinkButton, Stack, Box } from '../components/chungking-core'
import { FeaturedProject } from '../components/projects'
import {
  HomepageHero,
  HomepageContent,
  HomepageSection,
  HomepageSectionFooter,
  HomepageSectionTitle,
  LiveBanner
} from '../components/home'
import { BlogPostItem } from '../components/posts-index'
import { Container } from '../components/layout'

interface IndexPageProps {
  location: {
    pathname: string
  }
  data: {
    site: SiteData
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
    <TemplateWrapper layoutSize="xl">
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
          <HCard
            css={css`
              width: 100%;
              max-width: 640px;
            `}
          />
        </HomepageHero>
        <HomepageContent>
          <Container size="xl">
            <Stack spacing={64}>
              <HomepageSection>
                <LiveBanner />
              </HomepageSection>
              <HomepageSection>
                <Stack spacing="xxl">
                  <HomepageSectionTitle>Recent articles</HomepageSectionTitle>
                  <Box
                    display="grid"
                    gridTemplateColumns={['1fr', null, null, null, null, '1fr 1fr 1fr']}
                    gridGap="lg"
                  >
                    {recentPosts.map(({ node }) => (
                      <BlogPostItem isHomepage key={node.fields.slug} node={node} />
                    ))}
                  </Box>
                  <HomepageSectionFooter>
                    <NavLinkButton size="lg" to="/posts" variant="primary">
                      View more posts &rarr;
                    </NavLinkButton>
                  </HomepageSectionFooter>
                </Stack>
              </HomepageSection>
              <HomepageSection>
                <Stack spacing="xxl">
                  <HomepageSectionTitle>Projects</HomepageSectionTitle>
                  <FeaturedProject node={data.featuredProject} />
                  <HomepageSectionFooter>
                    <NavLinkButton size="lg" to="/projects" variant="primary">
                      View more of my stuff &rarr;
                    </NavLinkButton>
                  </HomepageSectionFooter>
                </Stack>
              </HomepageSection>
            </Stack>
          </Container>
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
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    featuredPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, fields: { category: { eq: "article" } } }
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
    featuredProject: markdownRemark(
      fields: { slug: { eq: "/projects/portfolio/kawalcovid19.id/" } }
    ) {
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
