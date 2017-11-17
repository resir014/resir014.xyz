import * as React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { renderStaticOptimized } from 'glamor/server'

import configureStore from './src/configureStore'

const store = configureStore()

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  )

  // Redo what `gatsby-plugin-glamor` did since their `gatsby-ssr.js` is overridden.

  let { html, css, ids } = renderStaticOptimized(() =>
    renderToString(<ConnectedBody />)
  )

  replaceBodyHTMLString(html)

  setHeadComponents([
    (
    <style
      id="glamor-styles"
      key="glamor-styles"
      dangerouslySetInnerHTML={{ __html: css }}
    />
    ),
    (
    <script
      id="glamor-ids"
      key="glamor-ids"
      dangerouslySetInnerHTML={{
        __html: `
        // <![CDATA[
        window._glamor = ${JSON.stringify(ids)}
        // ]]>
        `,
      }}
    />
    ),
  ])
}
