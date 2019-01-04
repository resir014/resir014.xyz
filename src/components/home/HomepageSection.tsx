import * as React from 'react'
import styled from '@emotion/styled'

import Container from '../ui/Container'

interface HomepageSectionProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, size, className }) => (
  <Section className={className}>
    <Container size={size || 'lg'}>{children}</Container>
  </Section>
)

export default HomepageSection

const Section = styled('section')``
