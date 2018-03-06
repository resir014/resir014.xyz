import * as React from 'react'
import styled, { css } from 'styled-components'

import { colors } from '../../styles/variables'

interface PostTitleProps {
  className?: string
  darkBackground?: boolean
}

const PostTitle: React.SFC<PostTitleProps> = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

export default styled(PostTitle)`
  margin: 0;
  margin-top: 0.5rem;
  font-weight: 700;
`
