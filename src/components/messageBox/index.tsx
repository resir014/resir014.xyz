import * as React from 'react'

const styles = require('./styles.module.scss')

const MessageBox: React.SFC<{}> = ({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
)

export default MessageBox
