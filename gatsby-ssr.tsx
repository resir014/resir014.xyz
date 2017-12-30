import * as React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { renderStaticOptimized } from 'glamor/server'

import configureStore from './src/configureStore'

const store = configureStore()

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  // We'll also redo what `gatsby-plugin-styled-components` did since their `gatsby-ssr.js` is overridden.

  const sheet = new ServerStyleSheet()

  const ConnectedBody = () => (
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        {bodyComponent}
      </Provider>
    </StyleSheetManager>
  )


  const body = renderToString(<ConnectedBody />)

  replaceBodyHTMLString(body)
  setHeadComponents([sheet.getStyleElement()])

  return
}
