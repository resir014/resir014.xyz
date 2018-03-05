import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../styles/variables'

interface MessageBoxProps {
  className?: string
}

const MessageBox: React.SFC<MessageBoxProps> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

export default styled(MessageBox)`
  margin: 3rem 0;
  padding: 1rem;
  color: ${colors.grey80};
  background-color: ${colors.grey10};

  p:last-child {
    margin-bottom: 0;
  }
`
