import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'
import Container from '../ui/Container'

interface PageTitleProps {
  className?: string
}

const PageTitle: React.SFC<PageTitleProps> = ({ className, children }) => (
  <Container size="lg" className={className}>
    {children}
  </Container>
)

export default styled(PageTitle)`
  padding: ${emSizes.containerPadding}rem;
  text-align: center;

  ${media.lg`
    padding-top: 3rem;
    padding-bottom: 3rem;
  `}
`
