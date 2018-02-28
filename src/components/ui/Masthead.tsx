import * as React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { pxSizes, emSizes, colors } from '../../styles/variables'
import { MenuProps } from '../../utils/types'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  transparent?: boolean
  onNavToggleClick: () => any
}

const MastheadTitle = styled.span`
  color: ${colors.white};
`

const Masthead: React.SFC<MastheadProps> = ({ className, children, title }) => (
  <header className={className}>
    <MastheadTitle>{title}</MastheadTitle>
  </header>
)

export default styled(Masthead)`
  height: ${pxSizes.heights.masthead}px;
  padding: 0 ${emSizes.containerPadding}rem;
  background-color: ${colors.grey90};
  color: ${transparentize(0.25, colors.white)};
`
