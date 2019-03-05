import * as React from 'react'
import styled from '@emotion/styled'

import { pxSizes, colors } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageSectionDescriptionProps {
  className?: string
}

export const HomepageSectionDescription: React.SFC<HomepageSectionDescriptionProps> = ({
  children,
  className
}) => <Paragraph className={className}>{children}</Paragraph>

const Paragraph = styled('p')`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 300;

  a {
    color: ${colors.green30};
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: 1.5rem;
  }
`
