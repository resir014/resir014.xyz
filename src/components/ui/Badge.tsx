import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colors } from '../../styles/variables'

interface BadgeProps {
  className?: string
  style?: React.CSSProperties
  color?: 'green' | 'blue' | 'red' | 'magenta' | 'grey' | 'white'
}

const Badge: React.FC<BadgeProps> = ({ children, className, style }) => (
  <span className={className} style={style}>
    {children}
  </span>
)

Badge.defaultProps = {
  className: undefined,
  style: undefined,
  color: 'white'
}

const WhiteColorStyles = css`
  color: #202340;
  background-color: #d7d7db;
`

const GreyColorStyles = css`
  color: ${colors.grey10};
  background-color: ${colors.grey80};
`

const GreenColorStyles = css`
  color: ${colors.white};
  background-color: ${colors.green30};
`

const BlueColorStyles = css`
  color: ${colors.white};
  background-color: ${colors.blue30};
`

const RedColorStyles = css`
  color: ${colors.white};
  background-color: ${colors.red30};
`

const MagentaColorStyles = css`
  color: ${colors.white};
  background-color: ${colors.magenta30};
`

export default styled<typeof Badge, BadgeProps>(Badge)`
  display: inline-block;
  padding: 0.125em 0.25em;
  font-size: 85%;
  border: 1px solid transparent;
  border-radius: 3px;

  ${props => props.color === 'white' && WhiteColorStyles}
  ${props => props.color === 'grey' && GreyColorStyles}
  ${props => props.color === 'green' && GreenColorStyles}
  ${props => props.color === 'blue' && BlueColorStyles}
  ${props => props.color === 'red' && RedColorStyles}
  ${props => props.color === 'magenta' && MagentaColorStyles}
`
