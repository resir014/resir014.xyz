import * as React from 'react'
import * as classnames from 'classnames'

import * as styles from './WidgetLinkButton.module.scss'

interface WidgetLinkButtonProps extends React.HTMLProps<HTMLButtonElement> {
  tag?: React.ReactType | string
  to?: string
}

class WidgetLinkButton extends React.Component<WidgetLinkButtonProps, {}> {
  public static defaultProps: Partial<WidgetLinkButtonProps> = {
    tag: 'a'
  }

  constructor(props: any) {
    super(props)
  }

  public render() {
    let {
      tag: Tag,
      children
    } = this.props

    if (this.props.href && Tag === 'button') {
      Tag = 'a'
    }

    return (
      <Tag
        className={styles.root}
        {...this.props}
      >
        {children}
      </Tag>
    )
  }
}

export default WidgetLinkButton
