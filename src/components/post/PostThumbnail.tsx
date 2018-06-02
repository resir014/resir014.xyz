import * as React from 'react'
import styled from 'styled-components'

interface PostThumbnailProps {
  className?: string
}

const PostThumbnail: React.SFC<PostThumbnailProps> = ({ className, children }) => (
  <section className={className}>{children}</section>
)

export default styled(PostThumbnail)`
  margin: 0;
`
