import * as React from 'react';
import { NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import nProgress from 'nprogress';
import { colors } from '@resir014/chungking-core';

import { defaultOpenGraph, defaultTwitterCard } from '~/lib/seo';
import { event, pageview } from '~/lib/ga';
import { trpc } from '~/lib/trpc';
import siteMetadata from '~/lib/data/site-metadata';
import type { NextAppProps } from '~/types/next';

import '~/fonts/jetbrains-mono.css';
import 'typeface-inter';
import '~/styles/global.css';
import '~/styles/nprogress.css';
import '~/styles/lite-youtube.css';
import '~/styles/shiki-twoslash.css';

const progress = nProgress.configure({ showSpinner: false });

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  event({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true,
  });
}

function App({ Component, pageProps, router }: NextAppProps): JSX.Element {
  React.useEffect(() => {
    // NProgress
    router.events.on('routeChangeStart', () => progress.start());
    router.events.on('routeChangeComplete', () => progress.done());
    router.events.on('routeChangeError', () => progress.done());

    return () => {
      router.events.off('routeChangeStart', () => progress.start());
      router.events.off('routeChangeComplete', () => progress.done());
      router.events.off('routeChangeError', () => progress.done());
    };
  }, [router.events]);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const getLayout = Component?.layout ?? ((children: JSX.Element) => children);
  const page = getLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content={colors.blue[500]} />
        <meta name="theme-color" content={colors.blue[500]} />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${siteMetadata.siteUrl}/posts/rss.xml`}
          title="RSS feed for this page"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href={`${siteMetadata.siteUrl}/posts/atom.xml`}
          title="Atom feed for this page"
        />
        <link
          rel="alternate"
          type="application/json"
          href={`${siteMetadata.siteUrl}/posts/feed.json`}
          title="JSON feed for this page"
        />
      </Head>

      <DefaultSeo
        title="Home"
        titleTemplate={`%s · ${siteMetadata.title}`}
        description={siteMetadata.description}
        canonical={siteMetadata.siteUrl + (router.asPath || '')}
        openGraph={defaultOpenGraph}
        twitter={defaultTwitterCard}
      />

      {page}
    </>
  );
}

export default trpc.withTRPC(App);
