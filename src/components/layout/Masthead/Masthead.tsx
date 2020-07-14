import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { mediaQueries, colors, widths, Text, breakpoints } from '../../chungking-core'
import menuItems from '../../../utils/menuItems'
import { MenuProps } from '../../../types/default'

import MastheadNav from './MastheadNav'
import { MastheadLinkStyles, MastheadTitleLinkStyles } from './styled'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
}

const Root = styled('nav')`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(auto, ${widths.xl}px) 1fr 1fr;
  background-color: ${colors.black};
  z-index: 50;
  box-shadow: inset 0 -1px ${colors.grey90};
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

  @media (max-width: calc(${breakpoints[3]} - 1px)) {
    flex-basis: 100%;
    text-align: center;
  }
`

const MastheadTitleLink = styled(Link)(MastheadLinkStyles, MastheadTitleLinkStyles)

const Masthead: React.FC<MastheadProps> = ({ className, title }) => {
  return (
    <Root className={className}>
      <MastheadInner>
        <MastheadTitle as="li">
          <MastheadTitleLink to="/">{title}</MastheadTitleLink>
        </MastheadTitle>
        <MastheadNav items={menuItems} />
      </MastheadInner>
    </Root>
  )
}

export default Masthead
