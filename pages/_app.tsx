import * as React from 'react'
import { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { CacheProvider, Global } from '@emotion/core'
import { cache } from 'emotion'
import nProgress from 'nprogress'

import { Theme, GlobalStyles, colors } from '~/components/chungking-core'
import nProgressStyles from '~/styles/nProgressStyles'
import prismTheme from '~/styles/prismTheme'
import { defaultOpenGraph, defaultTwitterCard } from '~/lib/seo'
import { event, pageview } from '~/lib/ga'

import siteMetadata from '~/_data/siteMetadata.json'

import '~/fonts/jetbrains-mono.css'
import 'typeface-inter'

const progress = nProgress.configure({ showSpinner: false })

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  event({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true
  })
}

function App({ Component, pageProps, router }: AppProps) {
  React.useEffect(() => {
    // NProgress
    router.events.on('routeChangeStart', () => progress.start())
    router.events.on('routeChangeComplete', () => progress.done())
    router.events.on('routeChangeError', () => progress.done())

    return () => {
      router.events.off('routeChangeStart', () => progress.start())
      router.events.off('routeChangeComplete', () => progress.done())
      router.events.off('routeChangeError', () => progress.done())
    }
  }, [])

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content={colors.blue[500]} />
        <meta name="theme-color" content={colors.blue[500]} />
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
      </Head>

      <DefaultSeo
        title="Home"
        titleTemplate={`%s · ${siteMetadata.title}`}
        description={siteMetadata.description}
        canonical={siteMetadata.siteUrl + (router.asPath || '')}
        openGraph={defaultOpenGraph}
        twitter={defaultTwitterCard}
      />

      <Theme>
        <Global styles={GlobalStyles} />
        <Global styles={nProgressStyles} />
        <Global styles={prismTheme} />
        <Component {...pageProps} />
      </Theme>
    </CacheProvider>
  )
}

export default App
