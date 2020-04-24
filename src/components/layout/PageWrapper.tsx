import * as React from 'react'
import Helmet from 'react-helmet'
import TemplateWrapper from '../../layouts'
import { Page } from '../page'

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
