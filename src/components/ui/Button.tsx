import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { transparentize } from 'polished'

import { fonts, colors } from '../../styles/variables'

export interface ButtonBaseProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  kind?: 'button' | 'link' | 'nav-link'
  color?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  ghosted?: boolean
  disabled?: boolean
}

type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.SFC<ButtonProps> = ({
  id,
  className,
  style,
  disabled,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      id={id}
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
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
  font-size: 14px;
  line-height: 14px;
  border-radius: 6px;
`

const MediumButtonStyles = css`
  padding: 0 24px;
  height: 38px;
  font-size: 16px;
  line-height: 16px;
  border-radius: 8px;
`

const LargeButtonStyles = css`
  padding: 0 32px;
  height: 52px;
  font-size: 18px;
  line-height: 18px;
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

export const ButtonBase = (props: ButtonProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: none;
  border: 1px solid transparent;
  background: none;
  font-family: ${fonts.sansSerif};
  text-align: center;
  transition: all 0.3s ease;

  &:not(:disabled):not(.disabled) {
    cursor: pointer;

    &:focus, &:active {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px 0px, rgba(255, 255, 255, 0.25) 0px 0px 0px 4px;
    }
  }

  &:hover,
  &:focus,
  &:active {
    outline: none;
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
