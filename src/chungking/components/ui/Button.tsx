import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { darken } from 'polished'
import Link from 'gatsby-link'

import { fonts, colors, emSizes } from '../../styles/variables'

interface ButtonProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  kind?: 'button' | 'link' | 'nav-link'
  color?: 'primary' | 'secondary' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  target?: string
  rel?: string
  disabled?: boolean
  onClick?: () => void
}

const Button: React.SFC<ButtonProps> = ({
  id,
  className,
  style,
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
      <button id={id} className={className} style={style} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )
  }

  if (kind === 'nav-link' && to) {
    return (
      <Link id={id} className={classnames(className, disabled && 'disabled')} style={style} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <a
      id={id}
      className={classnames(className, disabled && 'disabled')}
      style={style}
      href={href || to}
      target={target}
    >
      {children}
    </a>
  )
}

Button.defaultProps = {
  color: 'primary',
  size: 'md'
}

const SmallButtonStyles = css`
  font-size: 85%;
`

const PrimaryButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background-color: ${colors.blue30};
    color: ${colors.white};

    &:hover,
    &:focus {
      background-color: ${darken(0.15, colors.blue30)};
    }
  }
`

const SecondaryButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background-color: ${colors.magenta30};
    color: ${colors.white};

    &:hover,
    &:focus {
      background-color: ${darken(0.15, colors.magenta30)};
    }
  }
`

const DangerButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background-color: ${colors.red30};
    color: ${colors.white};

    &:hover,
    &:focus {
      background-color: ${darken(0.15, colors.red30)};
    }
  }
`

const WhiteButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background: none;
    background-color: ${colors.white};
    color: ${colors.black};

    &:hover,
    &:focus {
      background-color: ${darken(0.15, colors.white)};
    }
  }
`

const ButtonBase = (props: ButtonProps) => css`
  display: inline-block;
  padding: ${props.size === 'lg' ? '.75rem 1rem' : '.375rem .5rem'};
  border: none;
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: ${fonts.sansSerif};
  font-size: ${props.size === 'lg' ? '1.15rem' : '.9rem'};
  text-align: center;
  line-height: ${emSizes.lineHeight.regular};
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled,
  &.disabled {
    background-color: ${colors.grey90};
    border-color: ${colors.grey70};
    color: ${colors.white};
    user-select: none;
    cursor: unset;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  &:not(:disabled):not(.disabled) {
    &:hover,
    &:focus {
      text-decoration: none;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px 0px, rgba(255, 255, 255, 0.25) 0px 0px 0px 4px;
    }
  }

  ${props.color === 'primary' && PrimaryButtonStyles}
  ${props.color === 'secondary' && SecondaryButtonStyles}
  ${props.color === 'danger' && DangerButtonStyles}
  ${props.color === 'white' && WhiteButtonStyles}
  ${props.size === 'sm' && SmallButtonStyles};
`

export default styled(Button)(ButtonBase)
