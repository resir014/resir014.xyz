import * as React from 'react'
import styled from 'styled-components'

import MastheadNavItem from './MastheadNavItem'

import { MenuItem } from '../utils/types'
import mediaQueries from '../utils/mediaQueries'

interface MastheadNavProps {
  items: MenuItem[]
  className?: string
}

const MastheadNav: React.SFC<MastheadNavProps> = ({ className, items }) => (
  <nav className={className}>
    {items.map(item => {
      return <MastheadNavItem key={item.path} name={item.name} path={item.path} />
    })}
  </nav>
)

export default styled(MastheadNav)`
  display: none;

  @media ${mediaQueries.md} {
    display: flex;
  }
`
