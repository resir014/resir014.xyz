import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colors } from '../../styles/variables'

interface BadgeProps {
  className?: string
  style?: React.CSSProperties
  color?: 'grey' | 'white'
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

export default styled<typeof Badge, BadgeProps>(Badge)`
  display: inline-flex;
  align-items: center;
  padding: 0 4px;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid transparent;
  border-radius: 3px;

  ${props => props.color === 'white' && WhiteColorStyles}
  ${props => props.color === 'grey' && GreyColorStyles}
`
