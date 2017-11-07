import * as React from 'react'
import Link from 'gatsby-link'

import { Widget } from '../Widget'
import WidgetLinkButton from '../WidgetLinkButton/WidgetLinkButton'

const Intro: React.SFC<any> = () => (
  <Widget title="Hey, call me Resi.">
    <p className="lead">I'm a professional web developer based in Jakarta, Indonesia.</p>
    <WidgetLinkButton to="/about">
      More about me
    </WidgetLinkButton>
  </Widget>
)

export default Intro
