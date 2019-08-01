import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'

import { SiteMetadata } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import TemplateWrapper from '../layouts'

import { Button, Container, Badge, MessageBox } from '../components/ui'
import { Page, PageHeader, PageTitle, PageMetaItem, PageContent } from '../components/page'
import { colors } from '../styles/variables'
import { BookmarkLink } from '../components/bookmark'
import { PostIndexItemMeta } from '../components/posts-index'
import { FeaturedProject, ProjectCard } from '../components/projects'
import { ColorSwatch, TypographySpecimen } from '../components/design'

import getFeaturedProject from '../utils/getFeaturedProject'
import ProjectItem from '../components/projects/ProjectItem'

interface DesignSystemPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    projects: {
      edges: ProjectField[]
    }
  }
}

const buttonWrapperStyles: React.CSSProperties = {
  padding: '0.5rem 1rem 0.5rem 0px'
}

const buttonMarginStyles: React.CSSProperties = {
  marginRight: '1rem'
}

const WrapperRoot = styled('div')`
  margin-bottom: 3rem;
  padding: 1rem 1.5rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
`

const DesignSystemPage: React.SFC<DesignSystemPageProps> = ({ data }) => {
  const testProject = getFeaturedProject(data.projects.edges, 'Broville v11')
  const testProjectNode = testProject.node
  const testProjectTags = testProjectNode.fields.tags
    ? (JSON.parse(testProjectNode.fields.tags) as string[])
    : undefined

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`Chungking Design System · ${data.site.siteMetadata.title}`}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { property: 'og:title', content: 'Chungking Design System' },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description
            }
          ]}
        />
        <article>
          <PageHeader>
            <PageTitle>Chungking Design System</PageTitle>
          </PageHeader>
          <PageContent>
            <Container>
              <h2>Foundations</h2>
              <h3>Colors</h3>
              <h4>Primary</h4>
              <ColorSwatch color={colors.white} darkText />
              <ColorSwatch color={colors.black} />
              <h4>Secondary</h4>
              <ColorSwatch color={colors.grey10} darkText />
              <ColorSwatch color={colors.grey20} darkText />
              <ColorSwatch color={colors.grey30} darkText />
              <ColorSwatch color={colors.grey40} darkText />
              <ColorSwatch color={colors.grey50} />
              <ColorSwatch color={colors.grey60} />
              <ColorSwatch color={colors.grey70} />
              <ColorSwatch color={colors.grey80} />
              <ColorSwatch color={colors.grey90} />
              <h3>Accent Colors</h3>
              <h4>Magenta</h4>
              <ColorSwatch color={colors.magenta30} />
              <h4>Red</h4>
              <ColorSwatch color={colors.red20} />
              <ColorSwatch color={colors.red30} />
              <ColorSwatch color={colors.red40} />
              <h4>Orange</h4>
              <ColorSwatch color={colors.orange20} darkText />
              <ColorSwatch color={colors.orange30} darkText />
              <ColorSwatch color={colors.orange40} darkText />
              <h4>Green</h4>
              <ColorSwatch color={colors.green30} darkText />
              <h4>Purple</h4>
              <ColorSwatch color={colors.purple30} />
              <h4>Blue</h4>
              <ColorSwatch color={colors.blue20} />
              <ColorSwatch color={colors.blue30} />
              <ColorSwatch color={colors.blue40} />
              <h4>Ultramarine</h4>
              <ColorSwatch color={colors.ultramarine30} />
              <h3>Typography</h3>
              <h4>Sans Serif</h4>
              <WrapperRoot>
                <TypographySpecimen weight={100}>Sans Serif - 100</TypographySpecimen>
                <TypographySpecimen weight={200}>Sans Serif - 200</TypographySpecimen>
                <TypographySpecimen weight={300}>Sans Serif - 300</TypographySpecimen>
                <TypographySpecimen weight={400}>Sans Serif - 400</TypographySpecimen>
                <TypographySpecimen weight={500}>Sans Serif - 500</TypographySpecimen>
                <TypographySpecimen weight={600}>Sans Serif - 600</TypographySpecimen>
                <TypographySpecimen weight={700}>Sans Serif - 700</TypographySpecimen>
                <TypographySpecimen weight={800}>Sans Serif - 800</TypographySpecimen>
                <TypographySpecimen weight={900}>Sans Serif - 900</TypographySpecimen>
              </WrapperRoot>
              <h4>Monospace</h4>
              <WrapperRoot>
                <TypographySpecimen fontFamily="monospace" weight={400}>
                  Monospace - 400
                </TypographySpecimen>
                <TypographySpecimen fontFamily="monospace" weight={700}>
                  Monospace - 700
                </TypographySpecimen>
              </WrapperRoot>

              <h2>Components</h2>
              <h3>Badge</h3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <Badge>default</Badge> <Badge color="grey">grey</Badge>{' '}
                  <Badge color="green">green</Badge> <Badge color="blue">blue</Badge>{' '}
                  <Badge color="orange">orange</Badge>
                </div>
              </WrapperRoot>
              <h3>Button</h3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" style={buttonMarginStyles}>
                    Primary
                  </Button>
                  <Button color="primary" disabled>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" size="sm" style={buttonMarginStyles}>
                    Small
                  </Button>
                  <Button color="primary" size="sm" disabled>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" size="lg" style={buttonMarginStyles}>
                    Large
                  </Button>
                  <Button color="primary" size="lg" disabled>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="secondary" style={buttonMarginStyles}>
                    Secondary
                  </Button>
                  <Button color="secondary" disabled>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="danger" style={buttonMarginStyles}>
                    Danger
                  </Button>
                  <Button color="danger" disabled>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button ghosted style={buttonMarginStyles}>
                    Ghosted
                  </Button>
                  <Button ghosted disabled>
                    Disabled
                  </Button>
                </div>
              </WrapperRoot>

              <h2>Posts</h2>
              <h3>Paragraph</h3>
              <WrapperRoot>
                <div style={{ padding: '0' }}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error autem voluptate
                    libero delectus nesciunt vitae atque beatae placeat minus cumque sequi assumenda
                    quidem voluptas dicta nostrum modi, exercitationem ad ex.
                  </p>
                  <p>
                    Ut, a adipisci cum sequi cumque perspiciatis iure placeat reiciendis inventore
                    aut tempore libero, nobis ullam sit modi, tempora nam consequatur laboriosam
                    harum. Repellat quibusdam quia quos rerum cupiditate distinctio.
                  </p>
                </div>
              </WrapperRoot>
              <h3>Lists</h3>
              <WrapperRoot>
                <div style={{ padding: '0' }}>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis,
                      laudantium.
                    </li>
                    <li>
                      Exercitationem voluptas, rerum quo magnam velit quia adipisci quos unde?
                    </li>
                    <li>
                      Voluptate id pariatur sint provident aliquam aspernatur earum illum explicabo.
                    </li>
                  </ul>
                  <ol>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, illo.</li>
                    <li>
                      Explicabo necessitatibus repudiandae sed nulla expedita. Non, perspiciatis.
                      Iusto, id?
                    </li>
                    <li>
                      Labore inventore ratione perferendis, error voluptates suscipit impedit
                      laborum magni.
                    </li>
                  </ol>
                </div>
              </WrapperRoot>
              <h3>Blockquote</h3>
              <WrapperRoot>
                <div style={{ padding: '16px 0 0' }}>
                  <blockquote>The quick brown fox jumps over the lazy dog.</blockquote>
                </div>
              </WrapperRoot>
              <h3>Bookmark Link</h3>
              <WrapperRoot>
                <div style={{ padding: '0 0 16px' }}>
                  <BookmarkLink
                    title="Accessibility is not a “React Problem”"
                    link="https://www.netlify.com/blog/2019/02/25/accessibility-is-not-a-react-problem/"
                  />
                </div>
              </WrapperRoot>
              <h3>Post Metadata</h3>
              <WrapperRoot>
                <PostIndexItemMeta>
                  <PageMetaItem>
                    <time className="dt-published" dateTime="2019-03-03T12:00:00">
                      03 March 2019
                    </time>
                  </PageMetaItem>
                  <PageMetaItem className="p-category">Category</PageMetaItem>
                  <hr />
                </PostIndexItemMeta>
              </WrapperRoot>
              <h3>Message Box</h3>
              <WrapperRoot>
                <MessageBox>
                  <strong>Info:</strong> This post is also published on Medium.
                </MessageBox>
                <MessageBox variant="warning">
                  <strong>Update:</strong> Phoenix 1.4 ships with{' '}
                  <a href="https://webpack.js.org/">Webpack</a> by default, therefore this guide is
                  now outdated.
                </MessageBox>
                <MessageBox variant="info">
                  <strong>Protip:</strong> You can always use{' '}
                  <a href="https://rollupjs.org/">Rollup</a> to bundle libraries with tree-shaking.
                </MessageBox>
              </WrapperRoot>

              <h2>Projects</h2>
              <h3>Featured Project</h3>
              <FeaturedProject key={testProject.node.frontmatter.title} node={testProject.node} />
              <h3>Project Card</h3>
              <h4>Without Image</h4>
              <ProjectCard
                title={testProjectNode.frontmatter.title}
                description={testProjectNode.fields.description || testProjectNode.fields.lead}
                tags={testProjectTags}
              />
              <h4>With Image</h4>
              <ProjectCard
                image={testProjectNode.frontmatter.header_image}
                title={testProjectNode.frontmatter.title}
                description={testProjectNode.fields.description || testProjectNode.fields.lead}
                tags={testProjectTags}
              />
              <h3>Project Item List</h3>
              <h4>List Item</h4>
              <ProjectItem node={testProjectNode} />
            </Container>
          </PageContent>
        </article>
      </Page>
    </TemplateWrapper>
  )
}

export default DesignSystemPage

export const pageQuery = graphql`
  query DesignSystemPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
        }
      }
    }
    projects: allMarkdownRemark(
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
