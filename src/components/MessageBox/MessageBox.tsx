import * as React from 'react'
import styled from 'styled-components'
import * as Color from 'color'

import { photonColors } from '../../utils/theme'

const messageBoxClass = css({
  margin: '3rem 0',
  padding: '1rem',
  color: photonColors.grey80,
  backgroundColor: photonColors.grey10,

  '& p:last-child': {
    marginBottom: 0
  }
})

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
  color: ${photonColors.grey80};
  background-color: ${photonColors.grey10};

  p:last-child {
    margin-bottom: 0;
  }
`
