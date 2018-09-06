import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import { pxSizes, emSizes, colors } from '../../styles/variables'
import { MenuProps } from '../../utils/types'
import { getEmSize } from '../../styles/mixins'
import menuItems from '../../utils/menuItems'

import MastheadNav from './MastheadNav'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  transparent?: boolean
  onNavToggleClick: () => any
}

const MastheadInner = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
  }
`

const MastheadTitle = styled('div')`
  color: ${colors.white};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    margin-right: 1rem;
  }
`

const MastheadTitleLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Masthead: React.SFC<MastheadProps> = ({ className, title }) => (
  <header className={className}>
    <MastheadInner>
      <MastheadTitle>
        <MastheadTitleLink to="/">{title}</MastheadTitleLink>
      </MastheadTitle>
      <MastheadNav items={menuItems} />
    </MastheadInner>
  </header>
)

export default styled(Masthead)`
  padding: 1rem ${emSizes.containerPadding}rem;
  background-color: ${colors.grey90};
  color: ${colors.grey40};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    padding-top: ${emSizes.containerPadding / 2}rem;
    padding-bottom: ${emSizes.containerPadding / 2}rem;
  }
`
