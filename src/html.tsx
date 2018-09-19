import * as React from 'react'
import { withPrefix } from 'gatsby-link'
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
  public render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="icon" type="image/png" sizes="32x32" href={withPrefix('/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={withPrefix('/favicon-16x16.png')} />
          <link rel="apple-touch-icon" sizes="180x180" href={withPrefix('/apple-touch-icon.png')} />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content={colors.ink90} />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
