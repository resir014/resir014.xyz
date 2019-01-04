import * as React from 'react'
import styled from '@emotion/styled'

interface PostThumbnailProps {
  className?: string
}

const PostThumbnail: React.SFC<PostThumbnailProps> = ({ className, children }) => (
  <Section className={className}>{children}</Section>
)

export default PostThumbnail

const Section = styled('section')`
  margin: 0;
`
