import * as React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { transparentize } from 'polished'

import { fonts, colors } from '../../styles/variables'

interface ButtonProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  kind?: 'button' | 'link' | 'nav-link'
  color?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  ghosted?: boolean
  href?: string
  to?: string
  target?: string
  rel?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler
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
  color: 'secondary',
  size: 'md'
}

const DisabledButtonStyles = css`
  &:disabled,
  &.disabled {
    background-color: ${transparentize(0.5, colors.grey90)};
    border-color: ${colors.grey70};
    color: ${colors.white};
    user-select: none;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
`

const SmallButtonStyles = css`
  padding: 0 16px;
  height: 28px;
  font-size: 80%;
  border-radius: 6px;
`

const MediumButtonStyles = css`
  padding: 0 24px;
  height: 38px;
  font-size: 90%;
  border-radius: 8px;
`

const LargeButtonStyles = css`
  padding: 0 32px;
  height: 52px;
  font-size: 18px;
  border-radius: 10px;
`

const GhostedButtonStyles = css`
  margin: -6px -8px;
  padding: 6px 8px;
  border-radius: 8px;

  &:not(:disabled):not(.disabled) {
    color: ${colors.white};

    &:hover,
    &:focus {
      background-color: ${transparentize(0.9, colors.white)};
    }
  }
`

const PrimaryButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background-color: ${colors.blue30};
    color: ${colors.white};

    &:hover,
    &:focus {
      background-color: ${colors.blue40};
    }
  }

  ${DisabledButtonStyles}
`

const SecondaryButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background: none;
    background-color: ${colors.white};
    color: ${colors.black};

    &:hover {
      background-color: ${colors.grey10};
    }

    &:focus {
      background-color: ${colors.grey20};
    }
  }

  ${DisabledButtonStyles}
`

const DangerButtonStyles = css`
  &:not(:disabled):not(.disabled) {
    background-color: ${colors.red30};
    color: ${colors.white};

    &:hover {
      background-color: ${colors.red20};
    }

    &:focus {
      background-color: ${colors.red40};
    }
  }

  ${DisabledButtonStyles}
`

const ButtonBase = (props: ButtonProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: none;
  border: 1px solid transparent;
  font-family: ${fonts.sansSerif};
  text-align: center;
  transition: all 0.3s ease;

  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }

  ${props.color === 'primary' && !props.ghosted && PrimaryButtonStyles}
  ${props.color === 'secondary' && !props.ghosted && SecondaryButtonStyles}
  ${props.color === 'danger' && !props.ghosted && DangerButtonStyles}
  ${props.size === 'sm' && !props.ghosted && SmallButtonStyles};
  ${props.size === 'md' && !props.ghosted && MediumButtonStyles};
  ${props.size === 'lg' && !props.ghosted && LargeButtonStyles};
  ${props.ghosted && GhostedButtonStyles};
`

export default styled(Button)(ButtonBase)
