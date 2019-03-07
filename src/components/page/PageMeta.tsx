import * as React from 'react'
import styled from '@emotion/styled'

interface PostMetaProps {
  className?: string
}

const PageMeta: React.SFC<PostMetaProps> = ({ className, children }) => (
  <View className={className}>{children}</View>
)

export default PageMeta

const View = styled('div')`
  font-size: 90%;
  font-weight: 300;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`
