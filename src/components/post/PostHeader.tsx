import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PostHeaderProps {
  className?: string
  hasImage?: boolean
}

const PostHeader: React.SFC<PostHeaderProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(PostHeader)`
  padding: 3rem 1.5rem 0;
  text-align: center;
`
