import * as React from 'react'
import styled from 'react-emotion'

import { pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageSectionDescriptionProps {
  className?: string
}

const HomepageSectionDescription: React.SFC<HomepageSectionDescriptionProps> = ({
  children,
  className
}) => <Paragraph className={className}>{children}</Paragraph>

export default HomepageSectionDescription

const Paragraph = styled('p')`
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 300;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: 1.5rem;
  }
`
