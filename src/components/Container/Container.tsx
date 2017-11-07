import * as React from 'react'
import { css } from 'glamor'

import { breakpoints, widths } from '../../utils/theme'

const styles = css({
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: widths.normal,

  [breakpoints.lg]: {
    maxWidth: widths.large
  }
})

const Container: React.SFC = ({ children }) => (
  <div className={`${styles}`}>
    {children}
  </div>
)

export default Container
