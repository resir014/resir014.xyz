import * as React from 'react'
import styled from '@emotion/styled'

interface PostThumbnailProps {
  className?: string
}

const PageThumbnail: React.FC<PostThumbnailProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

export default PageThumbnail

const Section = styled('section')`
  margin: 0;
  overflow: hidden;
`
