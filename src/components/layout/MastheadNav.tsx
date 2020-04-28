/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import { Link } from 'gatsby'
import { transparentize } from 'polished'
import styled from '@emotion/styled'
import { LinkGetProps } from '@reach/router'

import { MenuItem } from '../../types/default'
import { mediaQueries, colors, Text } from '../chungking-core'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNavItem = styled(Text)`
  text-transform: lowercase;

  a {
    display: block;
    padding: 8px 16px;
    padding-bottom: calc(8px - 2px);
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

    ${mediaQueries.lg} {
      padding: 16px;
      padding-bottom: calc(16px - 2px);
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
        <MastheadNavItem as="li" key={item.path}>
          <Link getProps={isActive} to={item.path}>
            {item.name}
          </Link>
        </MastheadNavItem>
      )
    })}
  </>
)

export default MastheadNav
