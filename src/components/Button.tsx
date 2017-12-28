import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Link from 'gatsby-link'
import { css } from 'glamor'

import { photonColors, fonts } from '../utils/theme'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  id?: string
  className?: string
  kind?: 'button' | 'link' | 'nav-link'
  color?: string
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
      <ThemeProvider theme={theme}>
        <button id={id} className={className} onClick={onClick}>
          {children}
        </button>
      </ThemeProvider>
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
  color: ${props => props.color ? props.theme[props.color] : photonColors.grey70};
  border: 2px solid ${props => props.color ? props.theme[props.color] : photonColors.grey70};
  font-family: ${fonts.sansSerif};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, .5);
    text-decoration: none;
  }
`
