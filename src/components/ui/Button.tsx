import * as React from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import Link from 'gatsby-link'

import { fonts, colors, emSizes } from '../../styles/variables'
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
  disabled?: boolean
  onClick?: () => void
}

const theme = {
  primary: colors.blue60,
  white: colors.white
}

const Button: React.SFC<ButtonProps> = ({
  id,
  className,
  kind,
  href,
  to,
  disabled,
  onClick,
  target,
  children
}) => {
  if (kind === 'button') {
    return (
      <button id={id} className={className} onClick={onClick} disabled={disabled}>
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
  padding: ${props => (props.size === 'lg' ? '.5rem 1rem' : '.25rem .5rem')};
  background: transparent;
  color: ${props => (props.color ? theme[props.color] : colors.grey70)};
  border: 2px solid ${props => (props.color ? theme[props.color] : colors.grey70)};
  font-family: ${fonts.sansSerif};
  text-align: center;
  line-height: ${emSizes.lineHeight.regular};
  cursor: pointer;

  &:disabled {
    color: ${props =>
      props.color ? transparentize(0.75, theme[props.color]) : transparentize(0.75, colors.grey70)};
    border-color: ${props =>
      props.color ? transparentize(0.75, theme[props.color]) : transparentize(0.75, colors.grey70)};
    user-select: none;
    cursor: unset;
  }

  ${onEvent()`
    background-color: ${transparentize(0.9, colors.grey70)};
    text-decoration: none;

    &:disabled {
      background: none;
    }
  `} ${props =>
    props.size === 'sm' &&
    css`
      font-size: 85%;
    `};
`
