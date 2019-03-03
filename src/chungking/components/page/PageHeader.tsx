import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors } from '../../styles/variables'
import Container from '../ui/Container'

interface PageHeaderProps {
  className?: string
  hasImage?: boolean
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

export const PageHeader: React.SFC<PageHeaderProps> = ({ className, children, size }) => (
  <Section className={className}>
    <Container size={size}>
      <HeaderDivider />
      {children}
    </Container>
  </Section>
)

PageHeader.defaultProps = {
  className: undefined,
  hasImage: false,
  size: 'md'
}

const HeaderDivider = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 6px;
  margin-top: 0;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.magenta30});
`

const Section = styled('section')`
  padding: 3rem 1.5rem 0;
  background-color: transparent;
  z-index: 5;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: 18px;
  }
`
