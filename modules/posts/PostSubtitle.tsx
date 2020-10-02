import * as React from 'react'
import { Text } from '~/components/chungking-core'

interface PostSubtitleProps {
  className?: string
  style?: React.CSSProperties
}

const PostSubtitle: React.FC<PostSubtitleProps> = ({ className, style, children }) => {
  return (
    <Text as="p" mt="sm" mb={0} variant={500} fontWeight={300} className={className} style={style}>
      {children}
    </Text>
  )
}

export default PostSubtitle
