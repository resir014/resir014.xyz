import * as React from 'react'
import Link from 'gatsby-link'

// These items do not have its necessary typings, so we simply `require()` it.
const styles = require('./masthead.module.scss')
const background = require('./background.jpg')

interface MastheadProps {
  title: string
}

const flavors = [
  'has an internet connection',
  'makes stupid web things',
  'writes code',
  'drives an Asp Explorer',
  'stands up for net neutrality',
  'is online',
  'plays video games',
  'has a phone',
  'takes photos',
  'is afraid of dogs',
  'hates TV',
  'dumps abandoned projects on GitHub',
  'does TypeScript',
  'does JavaScript',
  'listens to music',
  'has a laptop',
  'is a web developer',
  'sleeps at night',
  'is not a furry',
  'probably likes you',
  'wants to be your friend'
]

const Masthead: React.SFC<MastheadProps> = ({ title }) => (
  <header className={styles.root}>
    <div className="container">
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.flavorText}>
        <span>{flavors[Math.floor(Math.random() * flavors.length)]}</span>
      </div>
    </div>
  </header>
)

export default Masthead
