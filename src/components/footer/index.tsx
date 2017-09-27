import * as React from 'react'

const styles = require('./styles.module.scss')

const Footer = () => (
  <footer className={styles.root}>
    <div className="container">
      <p>
        <small>
          &copy; 2017 Resi Respati. All right reserved.
        </small>
      </p>
      <p>
        <small>
          Powered by <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>{' '}
          using the <a href="https://github.com/blvdgroup/roundabout" target="_blank">Roundabout</a> theme.{' '}
          Background by <a href="https://www.toptal.com/designers/subtlepatterns/" target="_blank">Subtle Patterns</a>.
        </small>
      </p>
    </div>
  </footer>
)

export default Footer

