import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Page } from '../components/page'
import TemplateWrapper from './TemplateWrapper'

interface PageWrapperProps {
  pageTitle: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, pageTitle }) => {
  return (
    <TemplateWrapper>
      <Page>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        {children}
      </Page>
    </TemplateWrapper>
  )
}

export default PageWrapper
