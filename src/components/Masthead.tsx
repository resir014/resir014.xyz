// tslint:disable:jsx-no-lambda

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Media from 'react-responsive'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import styled from 'styled-components'

import Container from './Container'
import { MastheadNavItem } from './MastheadNavItem'
import ToggleMenu from './ToggleMenu'

import { ApplicationState } from '../store'
import { LayoutState, toggleSidebar } from '../store/layout'
import flavorText from '../utils/flavorText'
import { photonColors, breakpoints, widths, heights } from '../utils/theme'
import mediaQueries from '../utils/mediaQueries'
import { MenuProps } from '../utils/types'
import { sectionHeading, highlightedText } from '../utils/globalStyles'

const MastheadInner = styled.div`
  display: flex;
  flex-direction: row;
  height: ${heights.masthead};
`

const MastheadTitle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.5rem;

  ${breakpoints.lg} {
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

const MastheadToggle = styled.div`
  display: flex;
  align-items: center;
`

const MastheadToggleMenu = styled.div`
  display: inline-block;
  padding: .25rem .5rem;
  color: ${photonColors.grey90};
  background-color: ${photonColors.white};
  cursor: pointer;
  user-select: none;
`

const MastheadNav = styled.nav`
  display: flex;
`

interface MastheadTitleLinkProps {
  className?: string
  to: string
}

const MastheadTitleLinkRoot: React.SFC<MastheadTitleLinkProps> = ({ className, to, children }) => (
  <Link className={className} to={to}>{children}</Link>
)

const MastheadTitleLink = styled(MastheadTitleLinkRoot)`
  ${highlightedText(photonColors.white, 0, '.25rem')}

  color: ${photonColors.grey90};

  &:hover, &:focus {
    color: ${photonColors.grey90};
    text-decoration: none;
  }
`

interface MastheadProps extends MenuProps {
  title: string
  className?: string
  transparent?: boolean
  dispatch?: Dispatch<LayoutState>
}

class Masthead extends React.Component<MastheadProps & LayoutState, {}> {
  constructor(props: MastheadProps & LayoutState) {
    super(props)

    this.state = {
      splash: 'is a web developer'
    }
  }

  public render() {
    const { title, className, transparent, items, dispatch, sidebarVisible } = this.props

    return (
      <header className={className}>
        <Container>
          <MastheadInner>
            <MastheadTitle onClick={() => navigateTo('/')}>
              <MastheadTitleLink to="/">
                {title}
              </MastheadTitleLink>
            </MastheadTitle>
            <MastheadRight>
              <Media query={mediaQueries.md}>
                {matches => matches ? (
                  <MastheadNav>
                    {items.map(item => {
                      return <MastheadNavItem key={item.path} name={item.name} path={item.path} />
                    })}
                  </MastheadNav>
                ) : (
                  <MastheadToggle>
                    <MastheadToggleMenu onClick={() => dispatch(toggleSidebar())}>☰</MastheadToggleMenu>
                  </MastheadToggle>
                )}
              </Media>
            </MastheadRight>
          </MastheadInner>
        </Container>
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
  height: ${heights.masthead}
  padding: 0;
  background-color: ${props => props.transparent ? 'transparent' : photonColors.grey90};
  color: ${photonColors.white};
`

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, MastheadProps>(mapStateToProps)(StyledMasthead)
