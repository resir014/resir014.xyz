import * as React from 'react'
import styled, { css } from 'react-emotion'
import { transparentize } from 'polished'
import Link from 'gatsby-link'

import { fonts, colors, emSizes } from '../../styles/variables'

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
  }

  if (kind === 'nav-link' && to) {
    return (
      <Link id={id} className={className} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <a id={id} className={className} href={href || to} target={target}>
      {children}
    </a>
  )
}

const SmallButtonStyles = css`
  font-size: 85%;
`

const ButtonBase = (props: ButtonProps) => css`
  display: inline-block;
  padding: ${props.size === 'lg' ? '.5rem 1rem' : '.25rem .5rem'};
  background: transparent;
  color: ${props.color ? theme[props.color] : colors.grey70};
  border: 2px solid ${props.color ? theme[props.color] : colors.grey70};
  font-family: ${fonts.sansSerif};
  text-align: center;
  line-height: ${emSizes.lineHeight.regular};
  cursor: pointer;

  &:disabled {
    color: ${props.color
      ? transparentize(0.75, theme[props.color])
      : transparentize(0.75, colors.grey70)};
    border-color: ${props.color
      ? transparentize(0.75, theme[props.color])
      : transparentize(0.75, colors.grey70)};
    user-select: none;
    cursor: unset;
  }

  &:hover,
  &:focus {
    background-color: ${props.color ? theme[props.color] : colors.grey70};
    color: ${props.color && props.color === 'white' ? colors.grey70 : colors.white};
    text-decoration: none;

    &:disabled {
      background: none;
    }
  }

  ${props.size === 'sm' && SmallButtonStyles};
`

export default styled(Button)(ButtonBase)
