import * as React from 'react'

import * as styles from './MessageBox.module.scss'

const MessageBox: React.SFC<{}> = ({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
)

export default MessageBox
