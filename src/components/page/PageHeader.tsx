import * as React from 'react'
import styled, { css } from 'react-emotion'

import { colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface PageHeaderProps {
  className?: string
  fixedHeight?: boolean
}

const PageHeader: React.SFC<PageHeaderProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

const FixedHeightStyles = css`
  height: 14rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    height: 18rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    height: 22rem;
  }
`

const Section = styled('section')`
  position: relative;
  margin: 0;
  background: linear-gradient(to bottom right, ${colors.teal50}, ${colors.purple70});
  z-index: -1;

  ${(props: PageHeaderProps) => props.fixedHeight && FixedHeightStyles};
`

export default PageHeader
