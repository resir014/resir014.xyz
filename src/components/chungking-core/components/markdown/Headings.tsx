import * as React from 'react'
import { Heading } from '../../foundations'

export const H1: React.FC = ({ children }) => (
  <Heading as="h1" scale={900} mt={0} mb="md">
    {children}
  </Heading>
)

export const H2: React.FC = ({ children }) => (
  <Heading as="h2" scale={700} mt="xl" mb="md">
    {children}
  </Heading>
)

export const H3: React.FC = ({ children }) => (
  <Heading as="h3" scale={500} mt="lg" mb="md">
    {children}
  </Heading>
)

export const H4: React.FC = ({ children }) => (
  <Heading as="h4" scale={400} mt="md" mb="sm">
    {children}
  </Heading>
)

export const H5: React.FC = ({ children }) => (
  <Heading as="h5" scale={200} mt="sm" mb="sm">
    {children}
  </Heading>
)

export const H6: React.FC = ({ children }) => (
  <Heading as="h6" scale={200} mt="sm" mb="sm">
    {children}
  </Heading>
)
