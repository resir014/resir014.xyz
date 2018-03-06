import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

import Container from '../ui/Container'

interface HomepageThumbnailProps {
  className?: string
}

const HomepageThumbnail: React.SFC<HomepageThumbnailProps> = ({ className, children }) => (
  <Container size="fluid" className={className}>
    {children}
  </Container>
)

export default styled(HomepageThumbnail)`
  position: relative;
  margin-top: 0;
`
