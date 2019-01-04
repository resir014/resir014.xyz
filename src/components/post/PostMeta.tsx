import * as React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../styles/variables'

interface PostMetaProps {
  className?: string
}

const PostMeta: React.SFC<PostMetaProps> = ({ className, children }) => (
  <Div className={className}>{children}</Div>
)

export default PostMeta

const Div = styled('div')`
  color ${colors.grey50};
`
