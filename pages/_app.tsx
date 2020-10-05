import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { CacheProvider, Global } from '@emotion/core'
import { cache } from 'emotion'
import nProgress from 'nprogress'

import { Theme, GlobalStyles } from '~/components/chungking-core'
import nProgressStyles from '~/styles/nProgressStyles'
import prismTheme from '~/styles/prismTheme'
import { defaultOpenGraph, defaultTwitterCard } from '~/lib/seo'

import siteMetadata from '~/_data/siteMetadata.json'

import '~/fonts/jetbrains-mono.css'
import 'typeface-inter'

const progress = nProgress.configure({ showSpinner: false })

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

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
