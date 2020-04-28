import * as React from 'react'
import { Heading, HeadingProps } from '../chungking-core'

interface HomepageSectionTitleProps extends HeadingProps {
  className?: string
}

const HomepageSectionTitle: React.SFC<HomepageSectionTitleProps> = ({
  children,
  className,
  ...rest
}) => (
  <Heading as="h1" scale="canon" className={className} {...rest}>
    {children}
  </Heading>
)

export default HomepageSectionTitle
