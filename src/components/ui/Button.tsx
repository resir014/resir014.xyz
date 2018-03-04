import * as React from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import * as Color from 'color'
import Link from 'gatsby-link'

import { fonts, colors } from '../../styles/variables'
import { onEvent } from '../../styles/mixins'

interface ButtonProps {
  id?: string
  className?: string
  kind?: 'button' | 'link' | 'nav-link'
  color?: 'primary' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  target?: string
  rel?: string
  onClick?: () => void
}

const theme = {
  primary: colors.blue60,
  white: colors.white
}

const Button: React.SFC<ButtonProps> = ({ id, className, color, kind, href, to, onClick, target, rel, children }) => {
  if (kind === 'button') {
    return (
      <button id={id} className={className} onClick={onClick}>
        {children}
      </button>
    )
  } else if (kind === 'nav-link') {
    return (
      <Link id={id} className={className} to={to}>
        {children}
      </Link>
    )
  } else {
    return (
      <a id={id} className={className} href={href} target={target}>
        {children}
      </a>
    )
  }
}

export default styled(Button)`
  display: inline-block;
  padding: ${props => props.size === 'lg' ? '.5rem 1rem' : '.25rem .5rem'};
  background: transparent;
  color: ${props => props.color ? theme[props.color] : colors.grey70};
  border: 2px solid ${props => props.color ? theme[props.color] : colors.grey70};
  font-family: ${fonts.sansSerif};
  cursor: pointer;

  ${onEvent()`
    background-color: ${transparentize(0.9, colors.grey70)};
    text-decoration: none;
  `}

  ${props => props.size === 'sm' && css`
    font-size: 85%;
  `}
`
