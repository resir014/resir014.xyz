import * as React from 'react'
import styled from 'styled-components'

import { colors, pxSizes, emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface PageHeaderProps {
  className?: string
}

const HeaderImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;

  @supports(mix-blend-mode: luminosity) {
    mix-blend-mode: luminosity;
    opacity: 1;
  }
`

const PageHeader: React.SFC<PageHeaderProps> = ({ className }) => (
  <div className={className}>
    <HeaderImage src={require('../../assets/images/background.jpg')} alt="PageHeader" />
  </div>
)

export default styled(PageHeader)`
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  position: relative;
  height: 14rem;
  margin: -${emSizes.containerPadding}rem;
  margin-bottom: 0;
  background: linear-gradient(to bottom right,
    ${colors.teal50}, ${colors.purple70});
  z-index: -1;

  ${media.md`
    height: 18rem;
  `}

  ${media.lg`
    height: 22rem;
  `}
`
