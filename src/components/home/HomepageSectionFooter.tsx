import * as React from 'react'
import { Box } from '../chungking-core'

interface HomepageSectionProps {
  className?: string
  style?: React.CSSProperties
}

const HomepageSectionFooter: React.SFC<HomepageSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <Box className={className} style={style} textAlign="right" {...rest}>
    {children}
  </Box>
)

export default HomepageSectionFooter
