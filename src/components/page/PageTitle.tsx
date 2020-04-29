import * as React from 'react'
import { Heading } from '../chungking-core'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <Heading as="h1" variant={900} className={className} m={0}>
    {children}
  </Heading>
)

export default PageTitle
