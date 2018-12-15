import * as React from 'react'
import styled from 'react-emotion'

import Container from '../ui/Container'
import { getEmSize } from '../../styles/mixins'
import { pxSizes, emSizes } from '../../styles/variables'

interface HomepageThumbnailProps {
  className?: string
}

const HomepageThumbnail: React.SFC<HomepageThumbnailProps> = ({ className, children }) => (
  <Root size="fluid" className={className}>
    {children}
  </Root>
)

export default HomepageThumbnail

const Root = styled(Container)`
  position: relative;
  margin-top: 0;
  user-select: none;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding: 0 ${emSizes.containerPadding}rem;
  }
`
