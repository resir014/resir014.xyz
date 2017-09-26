import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./styles.module.scss');

const About: React.SFC<any> = () => (
  <div className={classnames(styles.root, 'container')}>
    <h1 className={styles.sectionTitle}>Hey, call me Resi.</h1>
    <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
    <p className="lead"><a href="https://resir014.github.io/about" target="_blank">More about me &rarr;</a></p>
  </div>
)

export default About
