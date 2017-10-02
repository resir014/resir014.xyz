import * as React from 'react'

import * as styles from './PageHeader.module.scss'

interface PageProps {
  headerImage?: string
}

const PageHeader: React.SFC<PageProps> = ({ children }) => {
  return (
    <header className={styles.root}>
      <div className={styles.headerInner}>
        {children}
      </div>
    </header>
  )
}

export default PageHeader
