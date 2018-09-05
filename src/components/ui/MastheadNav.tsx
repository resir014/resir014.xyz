import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import { MenuItem } from '../../utils/types'
import { getEmSize } from '../../styles/mixins'
import { colors, pxSizes } from '../../styles/variables'

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

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    &:before {
      content: '/';
      margin-right: 1rem;
    }
  }
`

const MastheadNavLink = styled(Link)`
  &.is-active {
    color: ${colors.white};
  }

  &:hover,
  &:focus {
    color: ${colors.white};
    text-decoration: none;
  }
`

const MastheadNav: React.SFC<MastheadNavProps> = ({ className, items }) => (
  <nav className={className}>
    {items.map(item => {
      return (
        <MastheadNavItem key={item.path}>
          <MastheadNavLink activeClassName="is-active" to={item.path}>
            {item.name}
          </MastheadNavLink>
        </MastheadNavItem>
      )
    })}
  </nav>
)

export default MastheadNav
