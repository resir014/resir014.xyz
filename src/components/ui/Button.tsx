import * as React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { darken, transparentize } from 'polished'

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
      <button
        id={id}
        type="button"
        className={className}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
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
  padding: 0.25rem 1rem;
  font-size: 80%;
  border-radius: 4px;
`

const MediumButtonStyles = css`
  padding: 0.5rem 1.5rem;
  font-size: 90%;
  border-radius: 6px;
`

const LargeButtonStyles = css`
  padding: 0.75rem 2rem;
  font-size: 1.15rem;
  border-radius: 8px;
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
    background-color: ${colors.orange30};
    color: ${colors.black};

    &:hover,
    &:focus {
      background-color: ${darken(0.15, colors.orange30)};
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
  margin: 0;
  padding: 0;
  border: none;
  border: 1px solid transparent;
  font-family: ${fonts.sansSerif};
  text-align: center;
  line-height: ${emSizes.lineHeight.regular};
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled,
  &.disabled {
    background-color: ${transparentize(0.5, colors.grey90)};
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
  ${props.size === 'md' && MediumButtonStyles};
  ${props.size === 'lg' && LargeButtonStyles};
`

export default styled(Button)(ButtonBase)
