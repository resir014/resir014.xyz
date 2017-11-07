import * as React from 'react'
import { css } from 'glamor'

import { sectionHeading, highlightedText } from '../../utils/mixins'
import { colors, breakpoints, widths } from '../../utils/theme'

const widgetLinkButtonClass = css({
  display: 'block',
  maxWidth: '300px',
  position: 'relative',
  marginTop: '1.5rem',
  paddingBottom: '.5rem',
  paddingRight: '2rem',
  borderBottom: `2px solid ${colors.neonblue2}`,
  textDecoration: 'none',

  ':after': {
    display: 'block',
    position: 'absolute',
    right: 0,
    bottom: '.6rem',
    width: '1rem',
    height: '1rem',
    content: ' ',
    // tslint:disable-next-line:max-line-length
    background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${colors.neonblue2}" d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>') 0 0 no-repeat`
  },

  ':hover, :focus': {
    color: colors.neonblue2,
    cursor: 'pointer'
  }
})

interface WidgetLinkButtonProps extends React.HTMLProps<HTMLLinkElement> {
  to: string
}

class WidgetLinkButton extends React.Component<WidgetLinkButtonProps, {}> {

  constructor(props: any) {
    super(props)
  }

  public render() {
    const { to, children } = this.props

    return (
      <a className={`${widgetLinkButtonClass}`} href={to}>
        {children}
      </a>
    )
  }
}

export default WidgetLinkButton
