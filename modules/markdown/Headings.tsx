import * as React from 'react'
import { Heading } from '@resir014/chungking-react'

export const H1: React.FC = ({ children }) => (
  <Heading as="h1" variant="xl" mt={0} mb="md">
    {children}
  </Heading>
)

export const H2: React.FC = ({ children }) => (
  <Heading as="h2" variant="lg" mt="xl" mb="md">
    {children}
  </Heading>
)

export const H3: React.FC = ({ children }) => (
  <Heading as="h3" variant="md" mt="lg" mb="md">
    {children}
  </Heading>
)

export const H4: React.FC = ({ children }) => (
  <Heading as="h4" variant="sm" mt="md" mb="sm">
    {children}
  </Heading>
)

export const H5: React.FC = ({ children }) => (
  <Heading as="h5" variant="sm" mt="sm" mb="sm">
    {children}
  </Heading>
)

export const H6: React.FC = ({ children }) => (
  <Heading as="h6" variant="sm" mt="sm" mb="sm">
    {children}
  </Heading>
)
