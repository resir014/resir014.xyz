import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./styles.module.scss')

export interface WidgetLinkButtonProps {
  url: string
  newtab: boolean
}

const WidgetLinkButton: React.SFC<WidgetLinkButtonProps> = ({ url, newtab, children }) => (
  <a
    className={styles.root}
    href={url}
    target={newtab ? '_blank' : ''}
    rel={newtab ? 'noopener' : ''}
  >
    {children}
  </a>
)

export default WidgetLinkButton
