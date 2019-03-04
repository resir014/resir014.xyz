import * as React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'

import { SiteMetadata } from '../types/gatsby'

import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import TemplateWrapper from '../layouts'
import PageContent from '../components/page/PageContent'

import { Button, Container } from '../chungking/components/ui'
import { PageHeader, PageTitle } from '../chungking/components/page'
import { colors } from '../chungking/styles/variables'
import { BookmarkLink } from '../chungking/components/bookmark'

interface DesignSystemPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
  }
}

const buttonWrapperStyles: React.CSSProperties = {
  padding: '0.5rem 1rem 0.5rem 0px'
}

const DesignSystemPage: React.SFC<DesignSystemPageProps> = ({ data }) => (
  <TemplateWrapper withChungking>
    <Page>
      <Helmet
        title={`Chungking Design System · ${data.site.siteMetadata.title}`}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { property: 'og:title', content: 'ChungkingTesting' },
          {
            property: 'og:description',
            content: data.site.siteMetadata.description
          }
        ]}
      />
      <article>
        <PageHeader>
          <PostMeta>
            <PageTitle>Chungking Design System</PageTitle>
          </PostMeta>
        </PageHeader>
        <PageContent>
          <Container>
            <h2>Button</h2>
            <WrapperRoot>
              <div style={buttonWrapperStyles}>
                <Button>Henlo</Button> <Button disabled>Henlo</Button>
              </div>
              <div style={buttonWrapperStyles}>
                <Button color="danger">Abort</Button>{' '}
                <Button color="danger" disabled>
                  Abort
                </Button>
              </div>
              <div style={buttonWrapperStyles}>
                <Button color="white">I'm white</Button>{' '}
                <Button color="white" disabled>
                  I'm white
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
                  Ut, a adipisci cum sequi cumque perspiciatis iure placeat reiciendis inventore aut
                  tempore libero, nobis ullam sit modi, tempora nam consequatur laboriosam harum.
                  Repellat quibusdam quia quos rerum cupiditate distinctio.
                </p>
              </div>
            </WrapperRoot>
            <h3>Lists</h3>
            <WrapperRoot>
              <div style={{ padding: '0' }}>
                <ul>
                  <li>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, laudantium.
                  </li>
                  <li>Exercitationem voluptas, rerum quo magnam velit quia adipisci quos unde?</li>
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
                    Labore inventore ratione perferendis, error voluptates suscipit impedit laborum
                    magni.
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
          </Container>
        </PageContent>
      </article>
    </Page>
  </TemplateWrapper>
)

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
  }
`

const WrapperRoot = styled('div')`
  margin-bottom: 3rem;
  padding: 1rem 1.5rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;
`
