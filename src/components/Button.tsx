import * as React from 'react'
import styled from 'styled-components'
import * as Color from 'color'
import Link from 'gatsby-link'

import { photonColors, fonts } from '../utils/theme'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  id?: string
  className?: string
  kind?: 'button' | 'link' | 'nav-link'
  color?: 'primary' | 'white'
  href?: string
  to?: string
  onClick?: () => void
}

const theme = {
  primary: photonColors.blue60,
  white: photonColors.white
}

const Button: React.SFC<ButtonProps> = ({ id, className, color, kind, href, to, onClick, children }) => {
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
      <a id={id} className={className} href={href}>
        {children}
      </a>
    )
  }
}

export default styled(Button)`
  display: inline-block;
  padding: .25rem .5rem;
  background: transparent;
  color: ${props => props.color ? theme[props.color] : photonColors.grey70};
  border: 2px solid ${props => props.color ? theme[props.color] : photonColors.grey70};
  font-family: ${fonts.sansSerif};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${Color(photonColors.grey70).alpha(0.1).lighten(0.1).rgb().string()};
    text-decoration: none;
  }
`
