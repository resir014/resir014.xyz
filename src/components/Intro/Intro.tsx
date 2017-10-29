import * as React from 'react'
import * as classnames from 'classnames'
import Link from 'gatsby-link'

import Widget from '../Widget/Widget'
import WidgetLinkButton from '../WidgetLinkButton/WidgetLinkButton'

import * as styles from './Intro.module.scss'

const Intro: React.SFC<any> = () => (
  <Widget title="Hey, call me Resi.">
    <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
    <p>
    <WidgetLinkButton tag={Link} to="/about">
      More about me
    </WidgetLinkButton>
    </p>
  </Widget>
)

export default Intro
