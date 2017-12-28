import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import styled from 'styled-components'

import { Container } from '../Container'

import { ApplicationState } from '../../store'
import { LayoutState, toggleSidebar } from '../../store/layout'
import { photonColors, widths, heights } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'
import { MenuProps, MenuItem } from '../../utils/types'

interface ToggleMenuProps extends MenuProps {
  visible?: boolean
  dispatch?: Dispatch<LayoutState>
}

const StyledToggleMenu = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  padding-top: ${heights.masthead};
  padding-bottom: 2rem;
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};
`

const ToggleMenuInner = styled.nav`
  width: 100%;
`

const ToggleMenuItem = styled(Link)`
  display: block;
  padding: .5rem 0;
  textDecoration: none;
  textAlign: center;
  borderTop: 1px solid ${photonColors.white};

  &:hover, &:focus {
    textDecoration: 'none'
  }

  &:last-child {
    borderBottom: 1px solid ${photonColors.white};
  }
`

const ToggleMenu: React.SFC<ToggleMenuProps & LayoutState> = ({ visible, items, dispatch }) => {
  return (
    <React.Fragment>
      {visible ? (
        <StyledToggleMenu>
          <ToggleMenuInner onClick={() => dispatch(toggleSidebar())}>
            <Container>
              {items.map(item => <ToggleMenuItem key={item.path} to={item.path}>{item.name}</ToggleMenuItem>)}
            </Container>
          </ToggleMenuInner>
        </StyledToggleMenu>
      ) : null}
    </React.Fragment>
  )
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, ToggleMenuProps>(mapStateToProps)(ToggleMenu)
