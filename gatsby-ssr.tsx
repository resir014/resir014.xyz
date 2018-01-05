import * as React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import configureStore from './src/configureStore'

const store = configureStore()

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents, setPostBodyComponents }) => {
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
  setPostBodyComponents([
    (
      <script
        key="netlify-cms"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on('init', user => {
                  if (!user) {
                    window.netlifyIdentity.on('login', () => {
                      document.location.href = '/admin/';
                    })
                  }
                })
              }
            })()
          `
        }}
      />
    )
  ])

  return
}
