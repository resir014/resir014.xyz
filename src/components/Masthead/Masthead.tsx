// tslint:disable:jsx-no-lambda

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import { css, merge } from 'glamor'

import { Container } from '../Container'
import { MastheadNavItem } from '../MastheadNavItem'
import { ToggleMenu } from '../ToggleMenu'

import { ApplicationState } from '../../store'
import { LayoutState, toggleSidebar } from '../../store/layout'
import flavorText from '../../utils/flavorText'
import { photonColors, breakpoints, widths, heights } from '../../utils/theme'
import { MenuProps } from '../../utils/types'
import { sectionHeading, highlightedText } from '../../utils/mixins'

const mastheadClass = (isHomepage?: boolean) => css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  height: heights.masthead,
  padding: 0,
  backgroundColor: isHomepage ? 'transparent' : photonColors.grey90,
  color: photonColors.white
})

const mastheadInnerClass = css({
  display: 'flex',
  flexDirection: 'row',
  height: heights.masthead
})

const mastheadTitleClass = css({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  marginRight: '1rem',
  fontSize: '1.5rem',

  [breakpoints.lg]: {
    width: 'calc(100% / 4)',
    fontSize: '1.75rem'
  }
})

const mastheadTitleInnerClass = (isHomepage?: boolean) =>
  css(merge(highlightedText(photonColors.white, 0, '.25rem'), {
    color: photonColors.grey90,

    '&:hover, &:focus': {
      color: photonColors.grey90,
      textDecoration: 'none'
    }
  }))

const mastheadRightClass = css({
  display: 'flex',
  height: '100%',
  width: '100%',
  alignItems: 'stretch',
  justifyContent: 'flex-end'
})

const mastheadToggleClass = css({
  display: 'flex',
  alignItems: 'center',

  [breakpoints.md]: {
    display: 'none'
  },
})

const mastheadToggleMenuClass = css({
  display: 'inline-block',
  padding: '.25rem .5rem',
  color: photonColors.grey90,
  backgroundColor: photonColors.white,
  cursor: 'pointer',
  userSelect: 'none'
})

const mastheadNavClass = css({
  display: 'none',

  [breakpoints.md]: {
    display: 'flex'
  },
})

const mastheadNavLinkClass = (isHomepage?: boolean) => css({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '0 1.5rem',
  color: photonColors.white,
  fontWeight: 600,

  '& span': merge(highlightedText(Color(photonColors.grey90).alpha(0.2), 0, '.25rem')),

  '&:hover, &:focus': {
    textDecoration: 'none',
    color: photonColors.grey90,

    '& span': merge(highlightedText(photonColors.white, 0, '.25rem'))
  }
})

const mastheadNavLinkActiveClass = (isHomepage?: boolean) => css({
  color: photonColors.grey90,

  '& span': merge(highlightedText(photonColors.white, 0, '.25rem'))
})

interface MastheadProps extends MenuProps {
  title: string
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
    const { title, transparent, items, dispatch, sidebarVisible } = this.props

    return (
      <header className={`${mastheadClass(transparent)}`}>
        <Container>
          <div className={`${mastheadInnerClass}`}>
            <div className={`${mastheadTitleClass}`} onClick={() => navigateTo('/')}>
              <Link
                to="/"
                className={`${mastheadTitleInnerClass(transparent)}`}
              >
                {title}
              </Link>
            </div>
            <div className={`${mastheadRightClass}`}>
              <div className={`${mastheadToggleClass}`}>
                <div className={`${mastheadToggleMenuClass}`} onClick={() => dispatch(toggleSidebar())}>☰</div>
              </div>
              <nav className={`${mastheadNavClass}`}>
                {items.map(item => {
                  return <MastheadNavItem key={item.path} name={item.name} path={item.path} />
                })}
              </nav>
            </div>
          </div>
        </Container>
      </header>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, MastheadProps>(mapStateToProps)(Masthead)
