import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { colors } from '../../styles/variables'

interface DividerProps {
  className?: string
  spacing?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  center?: boolean
}

const Divider: React.SFC<DividerProps> = ({ className }) => <hr className={className} />

const DividerFullWidth = (props: DividerProps) => css`
  width: 6rem;
  margin-left: ${props.center ? 'auto' : 0};
  margin-right: auto;
`

const DividerMatcher = (props: DividerProps) => {
  switch (props.spacing) {
    case 'large': {
      return css`
        margin-top: 3rem;
        margin-bottom: 3rem;
      `
    }
    case 'small': {
      return css`
        margin-top: 1rem;
        margin-bottom: 1rem;
      `
    }
    default: {
      return css`
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
      `
    }
  }
}

const DividerBase = (props: DividerProps) => css`
  position: relative;
  height: 6px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.magenta30});

  ${!props.fullWidth && DividerFullWidth(props)};
`

export default styled(Divider)(DividerBase, DividerMatcher)
