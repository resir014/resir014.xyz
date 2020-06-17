/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import { Link } from 'gatsby'
import { transparentize } from 'polished'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { LinkGetProps } from '@reach/router'

import { MenuItem } from '../../../types/default'
import { mediaQueries, colors, Text, space } from '../../chungking-core'
import { MastheadLinkStyles } from './styled'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNavItem = styled(Text)`
  text-transform: lowercase;

  a {
    display: block;
    padding: ${space.xs}px 0;
    padding-bottom: calc(8px - 2px);
    border-bottom: 2px solid transparent;

    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom-color: ${colors.white};
    }

    &:focus,
    &:active {
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
      padding: ${space.md}px 0;
      padding-bottom: calc(16px - 2px);
    }
  }
`

// Workaround for activeClassName: https://github.com/gatsbyjs/gatsby/issues/7737
const isActive = ({ isPartiallyCurrent }: LinkGetProps) => {
  return isPartiallyCurrent ? { className: 'is-active' } : {}
}

const MastheadNavLink = styled(Link)(MastheadLinkStyles)

const MastheadNav: React.FC<MastheadNavProps> = ({ items }) => (
  <>
    {items.map(item => {
      return (
        <MastheadNavItem
          as="li"
          key={item.path}
          mr="lg"
          css={css`
            &:last-child {
              margin-right: 0;
            }
          `}
        >
          <MastheadNavLink getProps={isActive} to={item.path}>
            {item.name}
          </MastheadNavLink>
        </MastheadNavItem>
      )
    })}
  </>
)

export default MastheadNav
