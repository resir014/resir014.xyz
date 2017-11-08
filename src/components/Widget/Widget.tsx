import * as React from 'react'
import { css, merge } from 'glamor'

import { breakpoints, colors } from '../../utils/theme'
import { sectionHeading } from '../../utils/mixins'

const widgetClass = css({
  padding: '1.5rem 0',
  borderTop: `4px solid ${colors.black}`,

  '& .widget-title': {
    marginTop: 0,
    marginBottom: '1rem',

    '& span': merge(sectionHeading(colors.black), {
      paddingLeft: '1.5rem',
      color: colors.white
    })
  }
})

const widgetContentClass = css({
  padding: '.5rem 1.5rem'
})

interface WidgetProps {
  title?: string
}

const Widget: React.SFC<WidgetProps> = ({ title, children }) => (
  <div className={`${widgetClass}`}>
    {title ? <h2 className="widget-title"><span>{title}</span></h2> : ''}
    <div className={`${widgetContentClass}`}>{children}</div>
  </div>
)

export default Widget
