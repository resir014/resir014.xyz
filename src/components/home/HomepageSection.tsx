import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface HomepageSectionProps {
  className?: string
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({ children, className }) => (
  <section className={className}>
    <Container size="lg">
      {children}
    </Container>
  </section>
)

export default HomepageSection
