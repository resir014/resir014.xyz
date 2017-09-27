import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

import WidgetLinkButton from '../widgetLinkButton'

const styles = require('./styles.module.scss')

const About: React.SFC<any> = () => (
  <div className={classnames(styles.root, 'container')}>
    <h1 className={styles.sectionTitle}>Hey, call me Resi.</h1>
    <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
    <p>
    <WidgetLinkButton
      url="https://resir014.github.io/about"
      newtab={true}
    >
      More about me
    </WidgetLinkButton>
    </p>
  </div>
)

export default About
