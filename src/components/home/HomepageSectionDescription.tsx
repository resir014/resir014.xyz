import * as React from 'react'

import { Paragraph } from '../chungking-core'

interface HomepageSectionDescriptionProps {
  className?: string
}

const HomepageSectionDescription: React.SFC<HomepageSectionDescriptionProps> = ({
  children,
  className
}) => (
  <Paragraph scale={600} m={0} fontWeight={300} className={className}>
    {children}
  </Paragraph>
)

export default HomepageSectionDescription
