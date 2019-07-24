/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { LinkGetProps } from '@reach/router'

import { MenuItem } from '../../types/default'
import { pxSizes } from '../../styles/variables'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNavItem = styled('li')`
  text-transform: lowercase;

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
