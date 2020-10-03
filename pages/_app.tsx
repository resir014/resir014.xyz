import * as React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { CacheProvider, Global } from '@emotion/core'
import { cache } from 'emotion'
import nProgress from 'nprogress'

import { Theme, GlobalStyles } from '~/components/chungking-core'
import nProgressStyles from '~/styles/nProgressStyles'
import prismTheme from '~/styles/prismTheme'

import '~/fonts/jetbrains-mono.css'
import 'typeface-inter'

const progress = nProgress.configure({ showSpinner: false })

export default class MyApp extends App {
  public componentDidMount() {
    // NProgress
    Router.events.on('routeChangeStart', () => progress.start())
    Router.events.on('routeChangeComplete', () => progress.done())
    Router.events.on('routeChangeError', () => progress.done())
  }

  public componentWillUnmount() {
    // NProgress
    Router.events.off('routeChangeStart', () => progress.start())
    Router.events.off('routeChangeComplete', () => progress.done())
    Router.events.off('routeChangeError', () => progress.done())
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <CacheProvider value={cache}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Theme>
          <Global styles={GlobalStyles} />
          <Global styles={nProgressStyles} />
          <Global styles={prismTheme} />
          <Component {...pageProps} />
        </Theme>
      </CacheProvider>
    )
  }
}
