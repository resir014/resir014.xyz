import * as React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

const styles = StyleSheet.create({
  widget: {
    marginBottom: '3rem'
  },
  sectionTitle: {
    display: 'inline-block',
    marginTop: 0,
    marginBottom: '1rem',
    marginLeft: 'calc(var(--container-padding) * -1)', // 1
    marginRight: '-(var(--container-padding))', // 1
    padding: '.5rem var(--container-padding)', // 2
    backgroundColor: 'var(--post-header-background-color)',
    color: 'var(--post-header-title-color)',

    '@media (min-width: 992px)': {
      marginLeft: 'calc(var(--container-padding-lg) * -1)', // 1
      paddingLeft: 'var(--container-padding-lg)', // 2
      paddingRight: '2rem' // 3
    }
  }
})

interface WidgetProps {
  title?: string
}

const Widget: React.SFC<WidgetProps> = ({ title, children }) => (
  <div className={css(styles.widget)}>
    {title ? <h2 className={css(styles.sectionTitle)}>{title}</h2> : ''}
    {children}
  </div>
)

export default Widget
