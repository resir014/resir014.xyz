import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

import WidgetLinkButton from '../WidgetLinkButton/WidgetLinkButton'

import * as styles from './Intro.module.scss'

const Intro: React.SFC<any> = () => (
  <div className={classnames(styles.root)}>
    <h1 className={styles.sectionTitle}>Hey, call me Resi.</h1>
    <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
    <p>
    <WidgetLinkButton tag={Link} to="/about">
      More about me
    </WidgetLinkButton>
    </p>
  </div>
)

export default Intro
