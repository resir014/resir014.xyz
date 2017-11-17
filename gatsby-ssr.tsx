import * as React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import configureStore from './src/configureStore'

const store = configureStore()

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
