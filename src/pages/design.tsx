import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'

import { SiteMetadata } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import TemplateWrapper from '../layouts'

import { Button, Container, Badge, MessageBox, NavLinkButton, AnchorButton } from '../components/ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageMetaItem,
  PageContent,
  BookmarkLink
} from '../components/page'
import { PostIndexItemMeta } from '../components/posts-index'
import { FeaturedProject, ProjectCard } from '../components/projects'
import { ColorSwatch } from '../components/design'
import {
  Text,
  Heading,
  P,
  UL,
  OL,
  LI,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  InlineCode,
  Blockquote,
  Small,
  colors,
  space,
  layerShadows
} from '../components/chungking-core'

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
  paddingRight: '16px'
}

const buttonMarginStyles: React.CSSProperties = {
  margin: '8px'
}

const WrapperRoot = styled('div')`
  margin-bottom: 3rem;
  padding: ${space.md}px ${space.lg}px;
  background-color: ${colors.grey90};
  border-radius: 6px;
  box-shadow: ${layerShadows.single};
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
              <H2>Colors</H2>
              <H3>Primary</H3>
              <ColorSwatch color={colors.white} darkText />
              <ColorSwatch color={colors.black} />
              <H3>Secondary</H3>
              <ColorSwatch color={colors.grey10} darkText />
              <ColorSwatch color={colors.grey20} darkText />
              <ColorSwatch color={colors.grey30} darkText />
              <ColorSwatch color={colors.grey40} darkText />
              <ColorSwatch color={colors.grey50} />
              <ColorSwatch color={colors.grey60} />
              <ColorSwatch color={colors.grey70} />
              <ColorSwatch color={colors.grey80} />
              <ColorSwatch color={colors.grey90} />
              <H2>Accent Colors</H2>
              <H3>Magenta</H3>
              <ColorSwatch color={colors.magenta20} />
              <ColorSwatch color={colors.magenta30} />
              <ColorSwatch color={colors.magenta40} />
              <H3>Red</H3>
              <ColorSwatch color={colors.red20} />
              <ColorSwatch color={colors.red30} />
              <ColorSwatch color={colors.red40} />
              <H3>Orange</H3>
              <ColorSwatch color={colors.orange20} darkText />
              <ColorSwatch color={colors.orange30} darkText />
              <ColorSwatch color={colors.orange40} darkText />
              <H3>Green</H3>
              <ColorSwatch color={colors.green20} darkText />
              <ColorSwatch color={colors.green30} darkText />
              <ColorSwatch color={colors.green40} darkText />
              <H3>Purple</H3>
              <ColorSwatch color={colors.purple20} />
              <ColorSwatch color={colors.purple30} />
              <ColorSwatch color={colors.purple40} />
              <H3>Blue</H3>
              <ColorSwatch color={colors.blue20} />
              <ColorSwatch color={colors.blue30} />
              <ColorSwatch color={colors.blue40} />
              <H3>Ultramarine</H3>
              <ColorSwatch color={colors.ultramarine20} />
              <ColorSwatch color={colors.ultramarine30} />
              <ColorSwatch color={colors.ultramarine40} />
              <H2>Typography</H2>
              <H3>Heading</H3>
              <WrapperRoot>
                <Heading scale="canon" my="md">
                  Heading - Canon
                </Heading>
                <Heading scale="trafalgar" my="md">
                  Heading - Trafalgar
                </Heading>
                <Heading scale="paragon" my="md">
                  Heading - Paragon
                </Heading>
                <Heading scale="doublePica" my="md">
                  Heading - Double Pica
                </Heading>
                <Heading scale="greatPrimer" my="md">
                  Heading - Great Primer
                </Heading>
                <Heading scale="body" my="md">
                  Heading - Body Copy
                </Heading>
                <Heading scale="pica" my="md">
                  Heading - Pica
                </Heading>
                <Heading scale="longPrimer" my="md">
                  Heading - Long Primer
                </Heading>
                <Heading scale="brevier" my="md">
                  Heading - Brevier
                </Heading>
                <Heading scale="minion" my="md">
                  Heading - Minion
                </Heading>
              </WrapperRoot>
              <H3>Text</H3>
              <WrapperRoot>
                <Text scale="canon" display="block" my="sm">
                  Text - Canon
                </Text>
                <Text scale="trafalgar" display="block" my="sm">
                  Text - Trafalgar
                </Text>
                <Text scale="paragon" display="block" my="sm">
                  Text - Paragon
                </Text>
                <Text scale="doublePica" display="block" my="sm">
                  Text - Double Pica
                </Text>
                <Text scale="greatPrimer" display="block" my="sm">
                  Text - Great Primer
                </Text>
                <Text scale="body" display="block" my="sm">
                  Text - Body Copy
                </Text>
                <Text scale="pica" display="block" my="sm">
                  Text - Pica
                </Text>
                <Text scale="longPrimer" display="block" my="sm">
                  Text - Long Primer
                </Text>
                <Text scale="brevier" display="block" my="sm">
                  Text - Brevier
                </Text>
                <Text scale="minion" display="block" my="sm">
                  Text - Minion
                </Text>
              </WrapperRoot>
              <H3>Monospace</H3>
              <WrapperRoot>
                <Text scale="pica" display="block" fontFamily="monospace" fontWeight={400}>
                  Text - Pica - Monospace - 400
                </Text>
                <Text scale="pica" display="block" fontFamily="monospace" fontWeight={700}>
                  Text - Pica - Monospace - 700
                </Text>
              </WrapperRoot>

              <H2>Components</H2>
              <H3>Badge</H3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <Badge>default</Badge> <Badge color="grey">grey</Badge>
                </div>
              </WrapperRoot>
              <H3>Button</H3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" style={buttonMarginStyles}>
                    Primary
                  </Button>
                  <Button color="primary" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" size="sm" style={buttonMarginStyles}>
                    Small
                  </Button>
                  <Button color="primary" size="sm" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="primary" size="lg" style={buttonMarginStyles}>
                    Large
                  </Button>
                  <Button color="primary" size="lg" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="secondary" style={buttonMarginStyles}>
                    Secondary
                  </Button>
                  <Button color="secondary" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button color="danger" style={buttonMarginStyles}>
                    Danger
                  </Button>
                  <Button color="danger" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button ghosted style={buttonMarginStyles}>
                    Ghosted
                  </Button>
                  <Button ghosted disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
              </WrapperRoot>
              <H3>NavLinkButton</H3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <NavLinkButton to="/" color="primary" style={buttonMarginStyles}>
                    Primary
                  </NavLinkButton>
                  <NavLinkButton to="/" color="secondary" style={buttonMarginStyles}>
                    Secondary
                  </NavLinkButton>
                  <NavLinkButton to="/" color="danger" style={buttonMarginStyles}>
                    Danger
                  </NavLinkButton>
                </div>
              </WrapperRoot>
              <H3>AnchorButton</H3>
              <WrapperRoot>
                <div style={buttonWrapperStyles}>
                  <AnchorButton
                    href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    style={buttonMarginStyles}
                  >
                    Primary
                  </AnchorButton>
                  <AnchorButton
                    href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="secondary"
                    style={buttonMarginStyles}
                  >
                    Secondary
                  </AnchorButton>
                  <AnchorButton
                    href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="danger"
                    style={buttonMarginStyles}
                  >
                    Danger
                  </AnchorButton>
                </div>
              </WrapperRoot>

              <H2>Posts</H2>
              <H3>Headings</H3>
              <WrapperRoot>
                <H1>h1. Heading</H1>
                <H2>h2. Heading</H2>
                <H3>h3. Heading</H3>
                <H4>h4. Heading</H4>
                <H5>h5. Heading</H5>
                <H6>h6. Heading</H6>
              </WrapperRoot>
              <H3>Paragraph</H3>
              <WrapperRoot>
                <P>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio
                  natus in incidunt quas totam enim laborum, facilis ipsam, sunt odio accusamus
                  doloribus eaque dolorem nisi iusto reprehenderit possimus optio.
                </P>
                <P>
                  <Small>
                    Sequi iste quas optio natus odit nostrum nobis atque, quidem repudiandae sunt
                    repellat. Corrupti magni ipsum quasi et ex. Rem, eum. Officia fugiat alias
                    magnam voluptatum temporibus minus voluptatem eos?
                  </Small>
                </P>
              </WrapperRoot>
              <H3>Unordered List</H3>
              <WrapperRoot>
                <UL>
                  <LI>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!
                  </LI>
                  <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
                  <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
                </UL>
              </WrapperRoot>
              <H3>Ordered List</H3>
              <WrapperRoot>
                <OL>
                  <LI>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!
                  </LI>
                  <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
                  <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
                </OL>
              </WrapperRoot>
              <H3>Inline Code</H3>
              <WrapperRoot>
                <P>
                  Run <InlineCode>npm install</InlineCode> to begin the installation process.
                </P>
              </WrapperRoot>
              <H3>Blockquote</H3>
              <WrapperRoot>
                <div style={{ padding: '16px 0 0' }}>
                  <Blockquote>The quick brown fox jumps over the lazy dog.</Blockquote>
                </div>
              </WrapperRoot>
              <H3>Bookmark Link</H3>
              <WrapperRoot>
                <BookmarkLink
                  title="Accessibility is not a “React Problem”"
                  link="https://www.netlify.com/blog/2019/02/25/accessibility-is-not-a-react-problem/"
                />
              </WrapperRoot>
              <H3>Post Metadata</H3>
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
              <H3>Message Box</H3>
              <WrapperRoot>
                <MessageBox>
                  <strong>Info:</strong> This post is also published on{' '}
                  <a href="https://medium.com/">Medium</a>.
                </MessageBox>
                <MessageBox variant="warning">
                  <strong>Update:</strong> Phoenix 1.4 ships with{' '}
                  <a href="https://webpack.js.org/">Webpack</a> by default, therefore this guide is
                  now outdated.
                </MessageBox>
              </WrapperRoot>

              <H2>Projects</H2>
              <H3>Featured Project</H3>
              <FeaturedProject key={testProject.node.frontmatter.title} node={testProject.node} />
              <H3>Project Card</H3>
              <ProjectCard
                title={testProjectNode.frontmatter.title}
                description={testProjectNode.fields.description || testProjectNode.fields.lead}
                tags={testProjectTags}
              />
              <ProjectCard
                image={testProjectNode.frontmatter.header_image}
                title={testProjectNode.frontmatter.title}
                description={testProjectNode.fields.description || testProjectNode.fields.lead}
                tags={testProjectTags}
              />
              <H3>Project Item List</H3>
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
