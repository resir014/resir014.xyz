import * as React from 'react'
import { Heading } from '../chungking-core'

export const H1: React.FC = ({ children }) => (
  <Heading as="h1" variant={900} mt={0} mb="md">
    {children}
  </Heading>
)

export const H2: React.FC = ({ children }) => (
  <Heading as="h2" variant={700} mt="xl" mb="md">
    {children}
  </Heading>
)

export const H3: React.FC = ({ children }) => (
  <Heading as="h3" variant={500} mt="lg" mb="md">
    {children}
  </Heading>
)

export const H4: React.FC = ({ children }) => (
  <Heading as="h4" variant={400} mt="md" mb="sm">
    {children}
  </Heading>
)

export const H5: React.FC = ({ children }) => (
  <Heading as="h5" variant={200} mt="sm" mb="sm">
    {children}
  </Heading>
)

export const H6: React.FC = ({ children }) => (
  <Heading as="h6" variant={200} mt="sm" mb="sm">
    {children}
  </Heading>
)
