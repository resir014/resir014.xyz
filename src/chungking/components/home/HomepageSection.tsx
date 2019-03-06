import * as React from 'react'
import styled from '@emotion/styled'

import Container from '../ui/Container'

interface HomepageSectionProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

export const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, size, className }) => (
  <Section className={className}>
    <Container size={size}>{children}</Container>
  </Section>
)

HomepageSection.defaultProps = {
  size: 'md'
}

const Section = styled('section')``
