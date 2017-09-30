import * as React from 'react'
import Link from 'gatsby-link'
import * as classnames from 'classnames'

const styles = require('./styles.module.scss')

import Intro from '../../components/Intro'
import WidgetLinkButton from '../../components/WidgetLinkButton'
import PageHeader from '../../components/PageHeader'
import PageSubtitle from '../../components/PageSubtitle'

const AboutPage: React.SFC<{}> = () => (
  <div>
    <div className={classnames(styles.root, 'container')}>
      <PageHeader>
        <h1 className={styles.sectionTitle}>About</h1>
      </PageHeader>
      <p className="lead">
        Hey, call me Resi! I'm a web developer.
      </p>
      <p>
        I started getting into web development when I self-learned HTML and{' '}
        CSS back in high school. I currently work as a junior web developer{' '}
        for <a href="https://www.c88fin.com/" target="_blank">C88 Financial{' '}
        Technologies</a>, a well-known player in the Indonesian fintech industry.
      </p>
      <p>
        I love open-source software, and I have been extensively contributing{' '}
        to the community for years. One of the biggest contributions I've{' '}
        made was to support the Indonesian localisation effort for the{' '}
        <a href="http://brackets.io/" target="_blank">Brackets editor</a>.{' '}
        On top of that, I also have many other utilities and personal{' '}
        projects that I host on my GitHub profile.
      </p>
      <p>
        My other interests include, video games, motorsports, photography,{' '}
        and music. I keep a catalogue of interests on my <a href="https://tilde.town/~resir014/" target="_blank">tilde.town page</a>.{' '}
        Be sure to check them out, we might have some things in common!
      </p>
      <WidgetLinkButton tag={Link} to="/">
        Go back home
      </WidgetLinkButton>
    </div>
    <div className={classnames(styles.root, 'container')}>
      <PageHeader>
        <h1 className={styles.sectionTitle}>Skills</h1>
      </PageHeader>
      <h3>Presentation</h3>
      <p>Bootstrap (3+), CSS, HTML, Sass</p>
      <h3>JavaScript</h3>
      <p>Angular (2+), ES6, jQuery, Node.js, React, TypeScript, Webpack</p>
      <h3>Server-side</h3>
      <p>Express, Laravel, Phoenix (learning)</p>
      <h3>Other</h3>
      <p>C#, Elixir (learning), Git, Java, SQL</p>
    </div>
  </div>
)

export default AboutPage
