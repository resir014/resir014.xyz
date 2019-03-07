/* eslint-disable react/no-danger */
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react'
import { withPrefix } from 'gatsby'
import { colors } from './styles/variables'

interface HtmlProps {
  body: string
  htmlAttributes: Record<string, any>
  bodyAttributes: Record<string, any>
  preBodyComponents: React.ReactNodeArray
  postBodyComponents: React.ReactNodeArray
  headComponents: React.ReactNodeArray
}

export default class HTML extends React.Component<HtmlProps, void> {
  public render(): JSX.Element {
    const {
      body,
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents
    } = this.props

    return (
      <html lang="en" {...htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="icon" type="image/png" sizes="32x32" href={withPrefix('/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={withPrefix('/favicon-16x16.png')} />
          <link rel="apple-touch-icon" sizes="180x180" href={withPrefix('/apple-touch-icon.png')} />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={colors.blue30} />
          <meta name="msapplication-TileColor" content={colors.black} />
          <meta name="theme-color" content={colors.black} />
          {process.env.GATSBY_GOOGLE_SITE_VERIFICATION && (
            <meta
              name="google-site-verification"
              content={process.env.GATSBY_GOOGLE_SITE_VERIFICATION}
            />
          )}
          {headComponents}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}
