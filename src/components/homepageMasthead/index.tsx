// tslint:disable:jsx-no-lambda

import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

// FIXME: currently there's no TypeScript declarations for `navigateTo()`, so
// the good ol' `require()` import is used until it's added.
// https://github.com/gatsbyjs/gatsby/issues/2256
const { navigateTo } = require('gatsby-link')

// These items do not have its necessary typings, so we simply `require()` it.
const styles = require('./masthead.module.scss')

interface MastheadProps {
  title: string
}

const flavors = [
  'is a web developer',
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
  'has an internet connection',
  'sleeps at night',
  'is not a furry',
  'probably likes you'
]

const shuffleArray = (arr: any[]) => arr.sort(() => (Math.random() - 0.5))

const HomepageMasthead: React.SFC<MastheadProps> = ({ title }) => {
  const shuffledFlavorText = shuffleArray(flavors)
  return (
    <header className={styles.root}>
      <div className={classnames('container')}>
        <div className={styles.title} onClick={() => navigateTo('/')}>
          <div className={styles.titleText}>
            <Link to="/">{title}</Link>
          </div>
          <div className={styles.flavorText}>
            <span>{shuffledFlavorText[0]}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomepageMasthead
