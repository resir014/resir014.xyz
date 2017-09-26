import * as React from 'react'

const styles= require('./footer.module.scss')

const Footer = () => (
  <footer className={styles.root}>
    <div className="container">
      <small>
        &copy; 2017 Resi Respati. All right reserved.
      </small>
      <small>
        Powered by <a href="https://jekyllrb.com" target="_blank">Jekyll</a> using the <a href="https://github.com/blvdgroup/roundabout" target="_blank">Roundabout</a> theme.
      </small>
    </div>
  </footer>
)

export default Footer

