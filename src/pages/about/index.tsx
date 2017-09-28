import * as React from 'react'
import Link from 'gatsby-link'
import * as classnames from 'classnames'

const styles = require('./styles.module.scss')

import Intro from '../../components/intro'
import WidgetLinkButton from '../../components/widgetLinkButton'

const AboutPage: React.SFC<{}> = () => (
  <div className={classnames(styles.root, 'container')}>
    <h1 className={styles.sectionTitle}>About</h1>
    <p className="lead">Hey, call me Resi! I’m a web developer.</p>
    <p>
      TODO: add more text here.
    </p>
    <p>
    <WidgetLinkButton tag={Link} to="/">
      Go back home
    </WidgetLinkButton>
    </p>
  </div>
)

export default AboutPage
