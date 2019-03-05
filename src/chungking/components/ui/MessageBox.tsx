import * as React from 'react'
import styled from '@emotion/styled'

import { colors } from '../../styles/variables'
import css from '@emotion/css'

interface MessageBoxProps {
  className?: string
}

const MessageBox: React.SFC<MessageBoxProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
)

export const MessageBoxBase = css`
  margin: 3rem 0;
  padding: 1rem;
  border: 1px solid ${colors.green30};
  border-radius: 6px;

  &:first-child {
    margin-top: 0;
  }

  a {
    color: ${colors.green30};
  }

  p,
  ul,
  ol {
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default styled(MessageBox)(MessageBoxBase)
