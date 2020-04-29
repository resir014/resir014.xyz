import * as React from 'react'
import { Link } from 'gatsby'
import { transparentize } from 'polished'
import styled from '@emotion/styled'

import { mediaQueries, colors, widths, breakpoints, Text } from '../chungking-core'
import menuItems from '../../utils/menuItems'
import { MenuProps } from '../../types/default'

import MastheadNav from './MastheadNav'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
}

const Root = styled('nav')`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(auto, ${widths.xl}px) 1fr 1fr;
  background-color: ${colors.black};
  z-index: 50;
  border-bottom: 1px solid ${colors.grey90};
`

const MastheadInner = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-column: 3/4;
  margin: 0;
  padding: 0;
  list-style-type: none;

  ${mediaQueries.lg} {
    justify-content: flex-end;
  }
`

const MastheadTitle = styled(Text)`
  margin-right: auto;

  a {
    display: block;
    padding: 8px 16px;
    padding-bottom: calc(8px - 2px);
    font-weight: 700;
    border-bottom: 2px solid transparent;
    transition: background-color 0.2s ease;

    &:hover,
    &:focus {
      text-decoration: none;
      background-color: ${transparentize(0.9, colors.white)};
    }

    &.is-active {
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    ${mediaQueries.lg} {
      padding: 16px;
      padding-bottom: calc(16px - 2px);
    }
  }

  @media (max-width: ${breakpoints[3] - 1}px) {
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
      <MastheadTitle as="li">
        <MastheadTitleLink to="/">{title}</MastheadTitleLink>
      </MastheadTitle>
      <MastheadNav items={menuItems} />
    </MastheadInner>
  </Root>
)

export default Masthead
