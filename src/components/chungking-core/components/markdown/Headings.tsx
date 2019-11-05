import * as React from 'react'
import { Heading } from '../../foundations'

export const H1: React.FC = ({ children }) => (
  <Heading as="h1" scale="canon" mt={0} mb="md">
    {children}
  </Heading>
)

export const H2: React.FC = ({ children }) => (
  <Heading as="h2" scale="paragon" mt="xl" mb="md">
    {children}
  </Heading>
)

export const H3: React.FC = ({ children }) => (
  <Heading as="h3" scale="greatPrimer" mt="lg" mb="md">
    {children}
  </Heading>
)

export const H4: React.FC = ({ children }) => (
  <Heading as="h4" scale="pica" mt="md" mb="sm">
    {children}
  </Heading>
)

export const H5: React.FC = ({ children }) => (
  <Heading as="h5" scale="brevier" mt="sm" mb="sm">
    {children}
  </Heading>
)

export const H6: React.FC = ({ children }) => (
  <Heading as="h6" scale="brevier" mt="sm" mb="sm">
    {children}
  </Heading>
)
