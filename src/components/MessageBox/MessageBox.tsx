import * as React from 'react'
import { css } from 'glamor'
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

const MessageBox: React.SFC<{}> = ({ children }) => (
  <div className={`${messageBoxClass}`}>
    {children}
  </div>
)

export default MessageBox
