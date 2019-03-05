import * as React from 'react'
import Link from 'gatsby-link'
import styled from '@emotion/styled'
import { LinkGetProps } from '@reach/router'

import { MenuItem } from '../../types/default'
import { getEmSize } from '../../styles/mixins'
import { pxSizes } from '../../styles/variables'

interface MastheadNavProps {
  items: MenuItem[]
  className?: string
}

const MastheadNavItem = styled('span')`
  margin-left: 1rem;
  text-transform: lowercase;

  &:first-of-type {
    margin-left: 0;
  }

  a {
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
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    &:before {
      content: '/';
      margin-right: 1rem;
    }
  }
`

// Workaround for activeClassName: https://github.com/gatsbyjs/gatsby/issues/7737
const isActive = ({ isPartiallyCurrent }: LinkGetProps) => {
  return isPartiallyCurrent ? { className: 'is-active' } : {}
}

const MastheadNav: React.SFC<MastheadNavProps> = ({ className, items }) => (
  <nav className={className}>
    {items.map(item => {
      return (
        <MastheadNavItem key={item.path}>
          <Link getProps={isActive} to={item.path}>
            {item.name}
          </Link>
        </MastheadNavItem>
      )
    })}
  </nav>
)

export default MastheadNav
