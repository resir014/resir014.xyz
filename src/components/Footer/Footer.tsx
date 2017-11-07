import * as React from 'react'
import { StyleSheet, css } from 'glamor/aphrodite'

import { Container } from '../Container'

const styles = StyleSheet.create({
  footer: {
    marginTop: '3rem',
    padding: '2rem 0',

    '& p, & small': {
      display: 'block',
      margin: 0
    }
  }
})

const Footer: React.SFC = () => (
  <footer className={css(styles.footer)}>
    <Container>
      <p>
        <small>Now with 100% more colors&trade;.</small>
      </p>
      <p>
        <small>
        Except where otherwise noted, contents are licensed under{' '}
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</a>.
        </small>
      </p>
      <p>
        <small>
          Powered by <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>.{' '}
          Background by <a href="https://www.toptal.com/designers/subtlepatterns/" target="_blank">Subtle Patterns</a>.
        </small>
      </p>
    </Container>
  </footer>
)

export default Footer

