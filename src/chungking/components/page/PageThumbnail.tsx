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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0 4px 8px 0;
`
