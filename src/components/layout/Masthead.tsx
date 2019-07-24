import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { pxSizes } from '../../styles/variables'
import menuItems from '../../utils/menuItems'
import { MenuProps } from '../../types/default'

import MastheadNav from './MastheadNav'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  onNavToggleClick: () => any
}

const Root = styled('nav')`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(auto, ${pxSizes.widths.xl}px) 1fr 1fr;
  height: 100%;
`

const MastheadInner = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-column: 3/4;
  margin: 0;
  padding: 0;
  list-style-type: none;

  @media (min-width: ${pxSizes.breakpoints.lg}px) {
    justify-content: flex-end;
  }
`

const MastheadTitle = styled('li')`
  margin-right: auto;

  a {
    display: block;
    padding: 0.5rem 1rem;

    &:hover,
    &:focus {
      text-decoration: none;
    }

    &.is-active {
      text-decoration: underline;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    @media (min-width: ${pxSizes.breakpoints.lg}px) {
      padding: 1rem;
    }
  }

  @media (max-width: ${pxSizes.breakpoints.lg - 1}px) {
    flex-basis: 100%;
    text-align: center;
  }
`

const MastheadTitleLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Masthead: React.SFC<MastheadProps> = ({ className, title }) => (
  <Root className={className}>
    <MastheadInner>
      <MastheadTitle>
        <MastheadTitleLink to="/">{title}</MastheadTitleLink>
      </MastheadTitle>
      <MastheadNav items={menuItems} />
    </MastheadInner>
  </Root>
)

export default Masthead
