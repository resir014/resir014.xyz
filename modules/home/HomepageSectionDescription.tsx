import * as React from 'react'

import { Paragraph } from '@resir014/chungking-react'

interface HomepageSectionDescriptionProps {
  className?: string
}

const HomepageSectionDescription: React.FC<HomepageSectionDescriptionProps> = ({ children, className }) => (
  <Paragraph variant={600} m={0} fontWeight={300} className={className}>
    {children}
  </Paragraph>
)

export default HomepageSectionDescription
