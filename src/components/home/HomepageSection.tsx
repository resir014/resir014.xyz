import * as React from 'react'
import styled from '@emotion/styled'
import { Container } from '../layout'

interface HomepageSectionProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, size, className }) => (
  <Section className={className}>
    <Container size={size}>{children}</Container>
  </Section>
)

export default HomepageSection

HomepageSection.defaultProps = {
  size: 'md'
}

const Section = styled('section')``
