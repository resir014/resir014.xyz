import * as React from 'react'

import Container from '../ui/Container'

interface HomepageSectionProps {
  className?: string
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <section className={className}>
    <Container size="xl">{children}</Container>
  </section>
)

export default HomepageSection
