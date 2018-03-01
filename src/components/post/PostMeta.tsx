import * as React from 'react'
import styled from 'styled-components'

interface PostMetaProps {
  className?: string
  hasBottomMargin?: boolean
}

const PostMeta: React.SFC<PostMetaProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

export default styled(PostMeta)`
  margin-bottom: ${props => props.hasBottomMargin ? '.5rem' : '0'};
`
