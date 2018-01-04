import * as React from 'react'
import styled from 'styled-components'
import * as Color from 'color'
import Link from 'gatsby-link'

import { highlightedText } from '../utils/globalStyles'
import mediaQueries from '../utils/mediaQueries'
import { photonColors } from '../utils/theme'
import { MenuItem } from '../utils/types'

const MastheadNavLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding-right: 1.5rem;
  color: ${photonColors.white};
  font-weight: 600;
  text-transform: lowercase;

  @media ${mediaQueries.md} {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 1.5rem;
  }

  span {
    ${highlightedText(Color(photonColors.grey90).alpha(0.2).rgb().toString(), 0, '.25rem')}
  }

  &:hover, &:focus {
    text-decoration: none;
    color: ${photonColors.grey90};

    span {
      ${highlightedText(photonColors.white, 0, '.25rem')}
    }
  }

  &.is-active {
    color: ${photonColors.grey90}

    span {
      ${highlightedText(photonColors.white, 0, '.25rem')}
    }
  }
`

interface MastheadNavItemProps extends MenuItem {
  className?: string
}

const MastheadNavItem: React.SFC<MastheadNavItemProps> = ({ className, name, path }) => (
  <MastheadNavLink
    className={className}
    activeClassName="is-active"
    to={path}
  >
    <span>{name}</span>
  </MastheadNavLink>
)

export default MastheadNavItem
