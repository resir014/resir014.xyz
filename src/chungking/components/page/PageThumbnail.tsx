import * as React from 'react'
import styled from '@emotion/styled'

interface PostThumbnailProps {
  className?: string
}

export const PageThumbnail: React.SFC<PostThumbnailProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

const Section = styled('section')`
  margin: 0;
  overflow: hidden;
`
