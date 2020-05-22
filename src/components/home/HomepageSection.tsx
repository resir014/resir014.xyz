import * as React from 'react'
import { Container } from '../layout'
import { Box, BoxProps } from '../chungking-core'

interface HomepageSectionProps extends BoxProps {
  className?: string
  style?: React.CSSProperties
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const HomepageSection: React.SFC<HomepageSectionProps> = ({
  children,
  className,
  style,
  ...rest
}) => (
  <Box as="section" className={className} style={style} {...rest}>
    {children}
  </Box>
)

export default HomepageSection

HomepageSection.defaultProps = {
  size: 'md'
}
