import * as React from 'react'
import { Heading, HeadingProps } from '@resir014/chungking-react'

interface HomepageSectionTitleProps extends HeadingProps {
  className?: string
}

const HomepageSectionTitle: React.FC<HomepageSectionTitleProps> = ({ children, className, ...rest }) => (
  <Heading as="h1" variant={900} className={className} {...rest}>
    {children}
  </Heading>
)

export default HomepageSectionTitle
