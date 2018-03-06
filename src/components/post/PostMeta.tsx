import * as React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { colors } from '../../styles/variables'

interface PostMetaProps {
  className?: string
}

const PostMeta: React.SFC<PostMetaProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

export default styled(PostMeta)`
  color ${transparentize(0.5, colors.grey90)};
`
