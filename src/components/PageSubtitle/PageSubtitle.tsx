import * as React from 'react'
import Helmet from 'react-helmet'

import * as styles from './PageSubtitle.module.scss'

interface PageSubtitleProps {
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default PageSubtitle
