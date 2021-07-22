import * as React from 'react'
import { Text } from '@resir014/chungking-react'

interface PostSubtitleProps {
  className?: string
  style?: React.CSSProperties
}

const PostSubtitle: React.FC<PostSubtitleProps> = ({ className, style, children }) => {
  return (
    <Text as="p" mt="sm" mb={0} fontSize="2xl" lineHeight="shorter" fontWeight={300} className={className} style={style}>
      {children}
    </Text>
  )
}

export default PostSubtitle
