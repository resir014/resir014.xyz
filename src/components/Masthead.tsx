// tslint:disable:jsx-no-lambda

import * as React from 'react'
import Media from 'react-responsive'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import styled from 'styled-components'

import Container from './Container'
import ToggleMenu from './ToggleMenu'
import MastheadNav from './MastheadNav'

import { colors, heights } from '../utils/theme'
import mediaQueries, { widths } from '../utils/mediaQueries'
import { MenuProps } from '../utils/types'
import { sectionHeading } from '../utils/globalStyles'
import { menuItems } from '../utils/menus'

const MastheadInner = styled.div`
  display: flex;
  flex-direction: row;
  height: ${heights.masthead};
`

const MastheadLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
  justify-content: flex-start;
  margin-right: 1rem;
  font-size: 1.5rem;
`

const MastheadTitleLink = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;

  @media ${mediaQueries.lg} {
    width: calc(100% / 4);
    font-size: 1.75rem;
  }
`

const MastheadRight = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;
  justify-content: flex-end;
`

export const MastheadToggle = styled.div`
  display: flex;
  align-items: center;

  @media ${mediaQueries.md} {
    display: none;
  }
`

export const MastheadToggleButton = styled.div`
  display: inline-block;
  padding: .25rem .5rem;
  color: ${colors.grey90};
  background-color: ${colors.white};
  cursor: pointer;
  user-select: none;
`

interface MastheadTitleLinkProps {
  className?: string
}

const MastheadTitleRoot: React.SFC<MastheadTitleLinkProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

const MastheadTitle = styled(MastheadTitleRoot)`
  ${sectionHeading(colors.white, 0, '.25rem')}

  color: ${colors.grey90};

  &:hover, &:focus {
    color: ${colors.grey90};
    text-decoration: none;
  }
`

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  transparent?: boolean
  onNavToggleClick: () => any
}

class Masthead extends React.Component<MastheadProps, {}> {
  constructor(props: MastheadProps) {
    super(props)

    this.state = {
      splash: 'is a web developer'
    }
  }

  public render() {
    const { title, className, transparent, items, onNavToggleClick } = this.props

    return (
      <header className={className}>
        <MastheadInner>
          <MastheadLeft>
            <MastheadTitleLink to="/">
              <MastheadTitle>
                {title}
              </MastheadTitle>
            </MastheadTitleLink>
          </MastheadLeft>
          <MastheadRight>
            <MastheadNav items={menuItems} />
            <MastheadToggle>
              <MastheadToggleButton onClick={onNavToggleClick}>☰</MastheadToggleButton>
            </MastheadToggle>
          </MastheadRight>
        </MastheadInner>
      </header>
    )
  }
}

const StyledMasthead = styled(Masthead)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: ${heights.masthead};
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: ${props => props.transparent ? 'transparent' : colors.grey90};
  color: ${colors.white};
`

export default StyledMasthead
