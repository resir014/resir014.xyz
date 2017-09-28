// tslint:disable:jsx-no-lambda

import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

// FIXME: currently there's no TypeScript declarations for `navigateTo()`, so
// the good ol' `require()` import is used until it's added.
// https://github.com/gatsbyjs/gatsby/issues/2256
// const { navigateTo } = require('gatsby-link')

import WidgetLinkButton from '../widgetLinkButton'

const styles = require('./styles.module.scss')

const About: React.SFC<any> = () => (
  <div className={classnames(styles.root)}>
    <h1 className={styles.sectionTitle}>Here's a section heading.</h1>
    <p className="lead">Add some more introductory text here later.</p>
    <p>
    <WidgetLinkButton tag={Link} to="/about">
      More about me
    </WidgetLinkButton>
    </p>
  </div>
)

export default About
