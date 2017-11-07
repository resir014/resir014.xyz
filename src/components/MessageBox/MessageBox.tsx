import * as React from 'react'
import { css } from 'glamor'
import * as Color from 'color'

import { colors } from '../../utils/theme'

const messageBoxClass = css({
  margin: '3rem 0',
  padding: '1rem',
  color: Color(colors.black).lighten(0.25).hex(),
  backgroundColor: Color(colors.white).darken(0.05).hex(),

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
