import * as React from 'react'
import styled from 'react-emotion'

import Container from '../ui/Container'

interface HomepageThumbnailProps {
  className?: string
}

const HomepageThumbnail: React.SFC<HomepageThumbnailProps> = ({ className, children }) => (
  <Root size="fluid" className={className}>
    {children}
  </Root>
)

export default HomepageThumbnail

const Root = styled(Container)`
  position: relative;
  margin-top: 0;
`
