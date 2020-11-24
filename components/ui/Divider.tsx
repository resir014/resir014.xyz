import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colors, space } from '@resir014/chungking-core'

interface DividerProps {
  className?: string
  spacing?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  center?: boolean
}

const Divider: React.FC<DividerProps> = ({ className }) => <hr className={className} />

const DividerFullWidth = (props: DividerProps) => css`
  width: ${space.xxl * 2}px;
  margin-left: ${props.center ? 'auto' : 0};
  margin-right: auto;
`

const DividerMatcher = (props: DividerProps) => {
  switch (props.spacing) {
    case 'large': {
      return css`
        margin-top: ${space.xxl}px;
        margin-bottom: ${space.xxl}px;
      `
    }
    case 'small': {
      return css`
        margin-top: ${space.md}px;
        margin-bottom: ${space.md}px;
      `
    }
    default: {
      return css`
        margin-top: ${space.lg}px;
        margin-bottom: ${space.lg}px;
      `
    }
  }
}

const DividerBase = (props: DividerProps) => css`
  position: relative;
  height: 6px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${colors.blue[500]}, ${colors.magenta[400]});

  ${!props.fullWidth && DividerFullWidth(props)};
`

export default styled(Divider)(DividerBase, DividerMatcher)
