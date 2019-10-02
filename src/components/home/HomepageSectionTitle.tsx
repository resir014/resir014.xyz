import * as React from 'react'
import { Heading } from '../chungking-core'

interface HomepageSectionTitleProps {
  className?: string
}

const HomepageSectionTitle: React.SFC<HomepageSectionTitleProps> = ({ children, className }) => (
  <Heading as="h1" scale="canon" mt="lg" mb="xs" className={className}>
    {children}
  </Heading>
)

export default HomepageSectionTitle
