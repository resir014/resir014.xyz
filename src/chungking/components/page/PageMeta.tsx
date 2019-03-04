import * as React from 'react'
import styled from '@emotion/styled'

interface PostMetaProps {
  className?: string
}

export const PageMeta: React.SFC<PostMetaProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

const Section = styled('section')`
  font-size: 90%;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`
