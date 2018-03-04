import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PageHeaderProps {
  className?: string
  hasImage?: boolean
}

const PageHeader: React.SFC<PageHeaderProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(PageHeader)`
  position: relative;
  margin: 0;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});
  z-index: -1;
`
