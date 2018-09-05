import * as React from 'react'
import styled, { css } from 'react-emotion'

import { colors } from '../../styles/variables'

interface DividerProps {
  className?: string
  spacing?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
}

const Divider: React.SFC<DividerProps> = ({ className }) => <hr className={className} />

const DividerFullWidth = css`
  width: 6rem;
  margin-left: auto;
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
  border: 0;
  border-bottom: 1px solid ${colors.grey30};

  ${!props.fullWidth && DividerFullWidth};
`

export default styled(Divider)(DividerBase, DividerMatcher)
