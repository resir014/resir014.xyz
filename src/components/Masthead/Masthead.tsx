// tslint:disable:jsx-no-lambda

import * as React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import { css, merge } from 'glamor'

import { Container } from '../Container'
import flavorText from '../../utils/flavorText'
import { colors, breakpoints, widths } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'

const mastheadClass = (isHomepage?: boolean) => css({
  padding: '1rem 0',
  backgroundColor: isHomepage ? 'transparent' : Color(colors.black).mix(Color(colors.white), 0.1),

  [breakpoints.md]: {
    padding: 0,
    height: '75px'
  }
})

const mastheadInnerClass = css({
  [breakpoints.md]: {
    display: 'flex',
    flexDirection: 'row',
    height: '75px'
  }
})

const mastheadTitleClass = css({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  marginRight: '1rem',
  fontSize: '1.5rem',

  [breakpoints.lg]: {
    width: 'calc(100% / 6)',
    fontSize: '1.75rem'
  }
})

const mastheadTitleInnerClass = (isHomepage?: boolean) =>
  css(merge(highlightedText(colors.white, 0, '.25rem'), {
    color: colors.black,

    '&:hover, &:focus': {
      color: colors.black,
      textDecoration: 'none'
    }
  }))

const mastheadNavClass = css({
  [breakpoints.md]: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'stretch',
  },
})

const mastheadNavLinkClass = (isHomepage?: boolean) => css({
  display: 'inline-block',
  marginTop: '1rem',
  paddingRight: '1.5rem',
  color: colors.white,
  fontWeight: 600,

  [breakpoints.md]: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: '0 1.5rem',
  },

  '& span': merge(highlightedText('transparent', 0, '.25rem')),

  '&:hover, &:focus': {
    textDecoration: 'none',
    color: colors.black,

    '& span': merge(highlightedText(colors.white, 0, '.25rem'))
  }
})

const mastheadNavLinkActiveClass = (isHomepage?: boolean) => css({
  color: colors.black,

  '& span': merge(highlightedText(colors.white, 0, '.25rem'))
})

interface MastheadProps {
  title: string
  isHomepage?: boolean
}

interface MastheadState {
  splash: string
}

class Masthead extends React.Component<MastheadProps, MastheadState> {
  constructor(props: MastheadProps) {
    super(props)

    this.state = {
      splash: 'is a web developer'
    }
  }

  public render() {
    const { title, isHomepage } = this.props
    const { splash } = this.state

    return (
      <header className={`${mastheadClass(isHomepage)}`}>
        <Container>
          <div className={`${mastheadInnerClass}`}>
            <div className={`${mastheadTitleClass}`} onClick={() => navigateTo('/')}>
              <Link
                to="/"
                className={`${mastheadTitleInnerClass(isHomepage)}`}
              >
                {title}
              </Link>
            </div>
            <nav className={`${mastheadNavClass}`}>
              <Link
                className={`${mastheadNavLinkClass(isHomepage)}`}
                activeClassName={`${mastheadNavLinkActiveClass(isHomepage)}`}
                to="/about"
              >
                <span>about</span>
              </Link>
              <Link
                className={`${mastheadNavLinkClass(isHomepage)}`}
                activeClassName={`${mastheadNavLinkActiveClass(isHomepage)}`}
                to="/posts"
              >
                <span>posts</span>
              </Link>
              <Link
                className={`${mastheadNavLinkClass(isHomepage)}`}
                activeClassName={`${mastheadNavLinkActiveClass(isHomepage)}`}
                to="/projects"
              >
                <span>projects</span>
              </Link>
              <Link
                className={`${mastheadNavLinkClass(isHomepage)}`}
                activeClassName={`${mastheadNavLinkActiveClass(isHomepage)}`}
                to="/etc"
              >
                <span>stuff</span>
              </Link>
            </nav>
          </div>
        </Container>
      </header>
    )
  }
}

export default Masthead
