import * as React from 'react'
import styled from '@emotion/styled'

import { pxSizes, emSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import Container from '../ui/Container'

interface PageTitleProps {
  className?: string
}

const PageMeta: React.SFC<PageTitleProps> = ({ className, children }) => (
  <Root size="lg" className={className}>
    {children}
  </Root>
)

export default PageMeta

const Root = styled(Container)`
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 0;
  text-align: center;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding-top: 3rem;
  }
`
