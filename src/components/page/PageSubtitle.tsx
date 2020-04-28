import * as React from 'react'
import { Text } from '../chungking-core'

interface PageSubtitleProps {
  className?: string
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ className, children }) => {
  return (
    <Text as="p" mt="sm" mb={0} scale={500} fontWeight={300} className={className}>
      {children}
    </Text>
  )
}

export default PageSubtitle
