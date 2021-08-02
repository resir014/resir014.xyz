import * as React from 'react'
import { Heading } from '@resir014/chungking-react'

export const H1: React.FC = ({ children }) => (
  <Heading as="h1" variant="4xl" mt={0} mb="md">
    {children}
  </Heading>
)

export const H2: React.FC = ({ children }) => (
  <Heading as="h2" variant="3xl" mt="xl" mb="md">
    {children}
  </Heading>
)

export const H3: React.FC = ({ children }) => (
  <Heading as="h3" variant="2xl" mt="lg" mb="md">
    {children}
  </Heading>
)

export const H4: React.FC = ({ children }) => (
  <Heading as="h4" variant="xl" mt="md" mb="sm">
    {children}
  </Heading>
)

export const H5: React.FC = ({ children }) => (
  <Heading as="h5" variant="lg" mt="sm" mb="sm">
    {children}
  </Heading>
)

export const H6: React.FC = ({ children }) => (
  <Heading as="h6" variant="lg" mt="sm" mb="sm">
    {children}
  </Heading>
)
