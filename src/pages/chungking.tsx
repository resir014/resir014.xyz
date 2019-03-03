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

interface ChungkingTestPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
  }
}

const buttonWrapperStyles: React.CSSProperties = {
  padding: '0.5rem 1rem 0.5rem 0px'
}

const ChungkingTestingPage: React.SFC<ChungkingTestPageProps> = ({ data }) => (
  <TemplateWrapper withChungking>
    <Page>
      <Helmet
        title={`ChungkingTesting · ${data.site.siteMetadata.title}`}
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
            <PageTitle>Chungking Testing</PageTitle>
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
          </Container>
        </PageContent>
      </article>
    </Page>
  </TemplateWrapper>
)

export default ChungkingTestingPage

export const pageQuery = graphql`
  query ChungkingTestingPageQuery {
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
