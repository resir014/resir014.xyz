import * as React from 'react'

import Container from '../ui/Container'

interface HomepageSectionProps {
  className?: string
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, size, className }) => (
  <section className={className}>
    <Container size={size || 'lg'}>{children}</Container>
  </section>
)

export default HomepageSection
