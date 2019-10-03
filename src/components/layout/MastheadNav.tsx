/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import { Link } from 'gatsby'
import { transparentize } from 'polished'
import styled from '@emotion/styled'
import { LinkGetProps } from '@reach/router'

import { MenuItem } from '../../types/default'
import { breakpoints, colors, typeScale } from '../chungking-core'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNavItem = styled('li')`
  text-transform: lowercase;

  a {
    display: block;
    padding: 8px 16px;
    padding-bottom: calc(8px - 2px);
    font-size: ${typeScale.pica.sm.fontSize}px;
    line-height: ${typeScale.pica.sm.lineHeight}px;
    border-bottom: 2px solid transparent;
    transition: background-color 0.2s ease;

    &:hover,
    &:focus {
      text-decoration: none;
      background-color: ${transparentize(0.9, colors.white)};
    }

    &.is-active {
      text-decoration: none;
      border-bottom-color: ${colors.white};

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    @media (min-width: ${breakpoints.lg}px) {
      padding: 16px;
      padding-bottom: calc(16px - 2px);
      font-size: ${typeScale.pica.lg.fontSize}px;
      line-height: ${typeScale.pica.lg.lineHeight}px;
    }
  }
`

// Workaround for activeClassName: https://github.com/gatsbyjs/gatsby/issues/7737
const isActive = ({ isPartiallyCurrent }: LinkGetProps) => {
  return isPartiallyCurrent ? { className: 'is-active' } : {}
}

const MastheadNav: React.SFC<MastheadNavProps> = ({ items }) => (
  <>
    {items.map(item => {
      return (
        <MastheadNavItem key={item.path}>
          <Link getProps={isActive} to={item.path}>
            {item.name}
          </Link>
        </MastheadNavItem>
      )
    })}
  </>
)

export default MastheadNav
