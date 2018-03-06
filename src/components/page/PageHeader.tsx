import * as React from 'react'
import styled, { css } from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PageHeaderProps {
  className?: string
  fixedHeight?: boolean
}

const PageHeader: React.SFC<PageHeaderProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

export default styled(PageHeader)`
  position: relative;
  margin: 0;
  background: linear-gradient(
    to bottom right,
    ${colors.teal50},
    ${colors.purple70}
  );
  z-index: -1;

  ${props =>
    props.fixedHeight &&
    css`
      height: 14rem;

      ${media.md`
      height: 18rem;
    `} ${media.lg`
      height: 22rem;
    `};
    `};
`
