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
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  position: relative;
  height: 14rem;
  margin: 0;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});
  z-index: -1;

  ${props => props.hasImage && media.md`
    height: 18rem;
  `}

  ${props => props.hasImage && media.lg`
    height: 22rem;
  `}
`
