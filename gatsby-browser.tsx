import * as React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { rehydrate } from 'glamor'
import { ApplicationState } from './src/store'

import configureStore from './src/configureStore'

const store = configureStore()

// Redo what `gatsby-plugin-glamor` did since their `gatsby-ssr.js` is overridden.
exports.onClientEntry = () => {
  const windowIfDefined = typeof window === 'undefined' ? null : window as any
  if (windowIfDefined._glamor) {
    rehydrate(windowIfDefined._glamor)
  }
}

exports.replaceRouterComponent = ({ history }) =>
  ({ children }) => (
    <Provider store={store} >
      <Router history={history}>{children}</Router>
    </Provider>
  )
