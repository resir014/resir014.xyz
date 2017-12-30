// tslint:disable:jsx-no-lambda

import * as React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import { css, merge } from 'glamor'

import Container from '../Container'
import flavorText from '../../utils/flavorText'
import { MenuItem } from '../../utils/types'
import { photonColors, breakpoints, widths } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'

const mastheadNavLinkClass = css({
  display: 'inline-block',
  marginTop: '1rem',
  paddingRight: '1.5rem',
  color: photonColors.white,
  fontWeight: 600,
  textTransform: 'lowercase',

  [breakpoints.md]: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: '0 1.5rem',
  },

  '& span': merge(highlightedText(Color(photonColors.grey90).alpha(0.2), 0, '.25rem')),

  '&:hover, &:focus': {
    textDecoration: 'none',
    color: photonColors.grey90,

    '& span': merge(highlightedText(photonColors.white, 0, '.25rem'))
  }
})

const mastheadNavLinkActiveClass = css({
  color: photonColors.grey90,

  '& span': merge(highlightedText(photonColors.white, 0, '.25rem'))
})

interface MastheadNavItemProps extends MenuItem {}

class MastheadNavItem extends React.Component<MastheadNavItemProps, {}> {
  constructor(props: MastheadNavItemProps) {
    super(props)

    this.state = {
      splash: 'is a web developer'
    }
  }

  public render() {
    const { name, path } = this.props
    return (
      <Link
        className={`${mastheadNavLinkClass}`}
        activeClassName={`${mastheadNavLinkActiveClass}`}
        to={path}
      >
        <span>{name}</span>
      </Link>
    )
  }
}

export default MastheadNavItem
