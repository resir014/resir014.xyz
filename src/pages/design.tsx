import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { RouterProps } from '@reach/router'

import { SiteData } from '../types/gatsby'
import { ProjectField } from '../types/fields'

import { TemplateWrapper } from '../layouts'

import {
  Page,
  PageHeader,
  PageTitle,
  PageMetaItem,
  PageContent,
  BookmarkLink
} from '../components/page'
import { PostIndexItemMeta } from '../components/posts-index'
import { FeaturedProject, ProjectCard, ProjectItem } from '../components/projects'
import { ColorSwatch } from '../components/design'
import {
  Text,
  Heading,
  Badge,
  MessageBox,
  Button,
  NavLinkButton,
  AnchorButton,
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
  shadows,
  Anchor
} from '../components/chungking-core'
import { Container } from '../components/layout'

import getFeaturedProject from '../utils/getFeaturedProject'

interface DesignSystemPageProps extends RouterProps {
  data: {
    site: SiteData
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
  margin-bottom: ${space.xxl}px;
  padding: ${space.md}px ${space.lg}px;
  background-color: ${colors.grey90};
  border-radius: 6px;
  box-shadow: ${shadows.single};
`

const DesignSystemPage: React.SFC<DesignSystemPageProps> = ({ data, location }) => {
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
        <Helmet>
          <title>Chungking Design System &middot; {data.site.siteMetadata.title}</title>
          <meta
            property="og:url"
            content={`${data.site.siteMetadata.siteUrl}${location ? location.pathname : ''}`}
          />
        </Helmet>
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
                <Heading variant={900} my="md">
                  Heading - 900
                </Heading>
                <Heading variant={800} my="md">
                  Heading - 800
                </Heading>
                <Heading variant={700} my="md">
                  Heading - 700
                </Heading>
                <Heading variant={600} my="md">
                  Heading - 600
                </Heading>
                <Heading variant={500} my="md">
                  Heading - 500
                </Heading>
                <Heading variant={400} my="md">
                  Heading - 400
                </Heading>
                <Heading variant={300} my="md">
                  Heading - 300
                </Heading>
                <Heading variant={200} my="md">
                  Heading - 200
                </Heading>
                <Heading variant={100} my="md">
                  Heading - 100
                </Heading>
              </WrapperRoot>
              <H3>Text</H3>
              <WrapperRoot>
                <Text variant={900} display="block" my="sm">
                  Text - 900
                </Text>
                <Text variant={800} display="block" my="sm">
                  Text - 800
                </Text>
                <Text variant={700} display="block" my="sm">
                  Text - 700
                </Text>
                <Text variant={600} display="block" my="sm">
                  Text - 600
                </Text>
                <Text variant={500} display="block" my="sm">
                  Text - 500
                </Text>
                <Text variant={400} display="block" my="sm">
                  Text - 400
                </Text>
                <Text variant={300} display="block" my="sm">
                  Text - 300
                </Text>
                <Text variant={200} display="block" my="sm">
                  Text - 200
                </Text>
                <Text variant={100} display="block" my="sm">
                  Text - 100
                </Text>
              </WrapperRoot>
              <H3>Monospace</H3>
              <WrapperRoot>
                <Text variant={400} display="block" fontFamily="monospace" fontWeight={400}>
                  Text - 400 - Monospace - Regular
                </Text>
                <Text variant={400} display="block" fontFamily="monospace" fontWeight={700}>
                  Text - 400 - Monospace - Bold
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
                  <Button variant="primary" style={buttonMarginStyles}>
                    Primary
                  </Button>
                  <Button variant="primary" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button variant="primary" size="sm" style={buttonMarginStyles}>
                    Small
                  </Button>
                  <Button variant="primary" size="sm" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button variant="primary" size="lg" style={buttonMarginStyles}>
                    Large
                  </Button>
                  <Button variant="primary" size="lg" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button variant="secondary" style={buttonMarginStyles}>
                    Secondary
                  </Button>
                  <Button variant="secondary" disabled style={buttonMarginStyles}>
                    Disabled
                  </Button>
                </div>
                <div style={buttonWrapperStyles}>
                  <Button variant="danger" style={buttonMarginStyles}>
                    Danger
                  </Button>
                  <Button variant="danger" disabled style={buttonMarginStyles}>
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
                  <NavLinkButton to="/" variant="primary" style={buttonMarginStyles}>
                    Primary
                  </NavLinkButton>
                  <NavLinkButton to="/" variant="secondary" style={buttonMarginStyles}>
                    Secondary
                  </NavLinkButton>
                  <NavLinkButton to="/" variant="danger" style={buttonMarginStyles}>
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
                    variant="primary"
                    style={buttonMarginStyles}
                  >
                    Primary
                  </AnchorButton>
                  <AnchorButton
                    href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    style={buttonMarginStyles}
                  >
                    Secondary
                  </AnchorButton>
                  <AnchorButton
                    href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="danger"
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
              <H3>Anchor</H3>
              <WrapperRoot>
                <Anchor
                  href="https://www.youtube.com/watch?v=lZ8bfsL-awY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Anchor>
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
                <Blockquote>The quick brown fox jumps over the lazy dog.</Blockquote>
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
                </PostIndexItemMeta>
              </WrapperRoot>
              <H3>Message Box</H3>
              <WrapperRoot>
                <MessageBox>
                  <P>
                    <strong>Info:</strong> This post is also published on{' '}
                    <a href="https://medium.com/">Medium</a>.
                  </P>
                </MessageBox>
                <MessageBox variant="warning">
                  <P>
                    <strong>Update:</strong> Phoenix 1.4 ships with{' '}
                    <a href="https://webpack.js.org/">Webpack</a> by default, therefore this guide
                    is now outdated.
                  </P>
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
                mb="lg"
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
