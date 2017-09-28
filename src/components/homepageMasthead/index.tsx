import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

// These items do not have its necessary typings, so we simply `require()` it.
const styles = require('./masthead.module.scss')

interface MastheadProps {
  title: string
}

const flavors = [
  'has an internet connection',
  'writes code',
  'drives an Asp Explorer',
  'is online',
  'is offline',
  'is typing',
  'plays video games',
  'has a phone',
  'takes photos',
  'is afraid of dogs',
  'hates TV',
  'likes vaporwave',
  'does React',
  'does TypeScript',
  'does JavaScript',
  'does node.js',
  'listens to music',
  'has a laptop',
  'wrote this flavor text',
  'is a web developer',
  'sleeps at night',
  'is not a furry',
  'probably likes you'
]

const HomepageMasthead: React.SFC<MastheadProps> = ({ title }) => (
  <header className={styles.root}>
    <div className={classnames('container')}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <Link to="/">{title}</Link>
        </div>
        <div className={styles.flavorText}>
          <span>{flavors[Math.floor(Math.random() * flavors.length)]}</span>
        </div>
      </div>
    </div>
  </header>
)

export default HomepageMasthead
