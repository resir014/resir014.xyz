import * as React from 'react'
import { Global, ThemeProvider } from '@emotion/react'
import { GlobalStyles, theme } from './utils'

const ChungkingProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      {children}
    </ThemeProvider>
  )
}

export default ChungkingProvider
