import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import { css, merge } from 'glamor'

import { Container } from '../Container'

import { ApplicationState } from '../../store'
import { LayoutState, toggleSidebar } from '../../store/layout'
import { photonColors, breakpoints, widths, heights } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'
import { MenuProps, MenuItem } from '../../utils/types'

const toggleMenuClass = (visible: boolean) => css({
  display: visible ? 'flex' : 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9,
  paddingTop: heights.masthead,
  paddingBottom: '2rem',
  color: photonColors.white,
  backgroundColor: photonColors.grey90
})

const toggleMenuInnerClass = css({
  width: '100%'
})

const toggleMenuItemClass = css({
  display: 'block',
  padding: '.5rem 0',
  textDecoration: 'none',
  textAlign: 'center',
  borderTop: `1px solid ${photonColors.white}`,

  '&:hover, &:focus': {
    textDecoration: 'none'
  },

  '&:last-child': {
    borderBottom: `1px solid ${photonColors.white}`
  }
})

interface ToggleMenuProps extends MenuProps {
  visible?: boolean
  dispatch?: Dispatch<LayoutState>
}

interface ToggleMenuItemProps extends MenuItem {
  //
}

const ToggleMenuItem: React.SFC<MenuItem> = ({ path, name }) => (
  <Link className={`${toggleMenuItemClass}`} key={path} to={path}>{name}</Link>
)

const ToggleMenu: React.SFC<ToggleMenuProps & LayoutState> = ({ visible, items, dispatch }) => {
  return (
    <div className={`${toggleMenuClass(visible)}`}>
      <div className={`${toggleMenuInnerClass}`} onClick={() => dispatch(toggleSidebar())}>
        <Container>
          {items.map(item => <ToggleMenuItem key={item.path} path={item.path} name={item.name} />)}
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, ToggleMenuProps>(mapStateToProps)(ToggleMenu)
