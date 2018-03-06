import * as React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { pxSizes, emSizes, colors } from '../../styles/variables'
import { MenuProps } from '../../utils/types'
import { media, onEvent } from '../../styles/mixins'
import menuItems from '../../utils/menuItems'

import MastheadNav from './MastheadNav'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  transparent?: boolean
  onNavToggleClick: () => any
}

const MastheadInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  ${media.md`
    flex-direction: row;
  `};
`

const MastheadTitle = styled.div`
  color: ${colors.white};

  ${media.md`
    margin-right: 1rem;
  `};
`

const MastheadTitleLink = styled(Link)`
  ${onEvent()`
    text-decoration: none;
  `};
`

const Masthead: React.SFC<MastheadProps> = ({
  className,
  children,
  items,
  title
}) => (
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
  background-color: ${colors.ink90};
  color: ${transparentize(0.5, colors.white)};

  ${media.md`
    padding-top: ${emSizes.containerPadding / 2}rem;
    padding-bottom: ${emSizes.containerPadding / 2}rem;
  `};
`
